import {action, observable} from "mobx";
import orderRepository from '../repository/OrderRepository';
import {AsyncStorage} from "react-native";
import OrderResponseModel from "../model/OrderResponseModel";

class TradingOrderStore {

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
    tradingList = [];

    @observable
    tradingLastNum = 0;

    rowCnt = 20;

    @action
    getTradingList = async () => {
        try {
            this.inProgress = true;
            let token = await AsyncStorage.getItem("token");
            const {data} = await orderRepository.findAllTrading(token, this.tradingLastNum, this.rowCnt);
            this.tradingList = this.refreshing
                ? data.map(requesting => new OrderResponseModel(requesting))
                : this.tradingList.concat(data.map(requesting => new OrderResponseModel(requesting)));
        } catch (e) {

        } finally {
            if (this.tradingList.length > 1) {
                this.tradingLastNum = this.tradingList[this.tradingList.length - 1].orderId;
            }
            this.inProgress = false;
            this.refreshing = false;
        }
    };

    @action
    refresh = async () => {
        this.refreshing = true;
        this.tradingLastNum = 0;
        await this.getTradingList();
    };

}

export default TradingOrderStore;
