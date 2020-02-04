import {action, observable, toJS} from "mobx";
import OrderModel from "../model/OrderModel";
import orderRepository from '../repository/OrderRepository';
import {AsyncStorage} from "react-native";
import OrderResponseModel from "../model/OrderResponseModel";
import Reactotron from 'reactotron-react-native';
import messageRepository from '../repository/MessageRepository';
import {COMPLETED, REQUESTING, TRADING} from "../constants/Status";

class OrderStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable
    inProgress = false;

    @observable
    order = null;

    @observable
    refreshing = false;

    @observable
    requestingList = [];

    @observable
    requestingLastNum = 0;

    @observable
    tradingList = [];

    @observable
    tradingLastNum = 0;

    @observable
    completedList = [];

    @observable
    completedLastNum = 0;

    ROWCNT = 20;

    @action
    requestOrder = async () => {
        try {
            this.inProgress = true;
            let token = await AsyncStorage.getItem("token");
            const {headers} = await orderRepository.save(token, this.order.postId, this.order.rentDate);
            await this.rootStore.userStore.getFriendInfo(this.order.writerId);
            let requestOrderUserName = await AsyncStorage.getItem("nickName");
            let message = `[나우나우] ${requestOrderUserName}님께서 거래요청을 하셨습니다. 자세한 내용은 나우나우 앱에서 확인해주세요.`;
            await messageRepository.sendMessage(this.rootStore.messageStore.destNum, message);
        } catch (e) {
        } finally {
            this.inProgress = false;
        }
    };

    @action
    getRequestingList = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await orderRepository.findAllRequesting(token, this.requestingLastNum, this.ROWCNT);
            this.requestingList = this.refreshing
                ? data.map(requesting => new OrderResponseModel(requesting))
                : this.requestingList.concat(data.map(requesting => new OrderResponseModel(requesting)));
        } catch (e) {
        } finally {
            if (this.requestingList.length > 1) {
                this.requestingLastNum = this.requestingList[this.requestingList.length - 1].orderId;
            }
            this.refreshing = false;
        }
    };

    @action
    getTradingList = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await orderRepository.findAllTrading(token, this.tradingLastNum, this.ROWCNT);
            this.tradingList = this.refreshing
                ? data.map(requesting => new OrderResponseModel(requesting))
                : this.tradingList.concat(data.map(requesting => new OrderResponseModel(requesting)));
        } catch (e) {

        } finally {
            if (this.tradingList.length > 1) {
                this.tradingLastNum = this.tradingList[this.tradingList.length - 1].orderId;
            }
            this.refreshing = false;
        }
    };

    @action
    getCompletedList = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await orderRepository.findAllCompleted(token, this.completedLastNum, this.ROWCNT);
            this.completedList = this.refreshing
                ? data.map(requesting => new OrderResponseModel(requesting))
                : this.completedList.concat(data.map(requesting => new OrderResponseModel(requesting)));
            this.completedLastNum += 1;
        } catch (e) {
        } finally {
            if (this.completedList.length > 1) {
                this.completedLastNum = this.completedList[this.completedList.length - 1].orderId;
            }
            this.refreshing = false;
        }
    };

    @action
    refreshTo = async (status) => {
        this.refreshing = true;
        if (status === REQUESTING) {
            this.requestingLastNum = 0;
            await this.getRequestingList();
        } else if (status === TRADING) {
            this.tradingLastNum = 0;
            await this.getTradingList();
        } else if (status === COMPLETED) {
            this.completedLastNum = 0;
            await this.getCompletedList();
        }
    };

    @action
    okRequesting = async ({order}) => {
        try {
            let token = await AsyncStorage.getItem("token");
            await orderRepository.okRequesting(token, order.orderId);

            await this.rootStore.userStore.getFriendInfo(order.consumerId);
            let message = `[나우나우] ${order.sellerName}님께서 거래를 수락하셨습니다. 자세한 내용은 나우나우 앱에서 확인해주세요.`;
            await messageRepository.sendMessage(this.rootStore.messageStore.destNum, message);
        } catch (e) {
            Reactotron.log(e);
        } finally {

        }
    };

    @action
    cancelRequesting = async ({orderId}) => {
        try {
            let token = await AsyncStorage.getItem("token");
            await orderRepository.cancelRequesting(token, orderId);
        } catch (e) {
            Reactotron.log(e);
        } finally {

        }
    };

    completeOrder = async ({order}) => {
        try {
            let token = await AsyncStorage.getItem("token");
            await orderRepository.completeOrder(token, order.orderId);

            let destNumId = null;
            let name = '';
            if (order.orderType === 'sale') {
                destNumId = order.sellerId;
                name = order.consumerName;
            } else {
                destNumId = order.consumerId;
                name = order.sellerName;
            }

            await this.rootStore.userStore.getFriendInfo(destNumId);
            let message = `[나우나우] ${name}님과의 거래가 완료되었습니다. 자세한 내용은 나우나우 앱에서 확인해주세요.`;
            await messageRepository.sendMessage(this.rootStore.messageStore.destNum, message);
        } catch (e) {
            Reactotron.log(e);
        } finally {

        }
    };

    @action
    setOrder = (post) => {
        try {
            this.order = new OrderModel(toJS(post));
        } catch (e) {

        } finally {

        }
    };
}

export default OrderStore;
