import {action, observable} from "mobx";
import orderRepository from '../repository/OrderRepository';
import {AsyncStorage} from "react-native";
import OrderResponseModel from "../model/OrderResponseModel";

class RequestingOrderStore {

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

    rowCnt = 20;

    @action
    getRequestingList = async () => {
        try {
            this.inProgress = true;
            let token = await AsyncStorage.getItem("token");
            const {data} = await orderRepository.findAllRequesting(token, this.requestingLastNum, this.rowCnt);
            this.requestingList = this.refreshing
                ? data.map(requesting => new OrderResponseModel(requesting))
                : this.requestingList.concat(data.map(requesting => new OrderResponseModel(requesting)));
        } catch (e) {
        } finally {
            if (this.requestingList.length > 1) {
                this.requestingLastNum = this.requestingList[this.requestingList.length - 1].orderId;
            }
            this.inProgress = false;
            this.refreshing = false;
        }
    };

    @action
    refresh = async () => {
        this.refreshing = true;
        this.requestingLastNum = 0;
        await this.getRequestingList();
    };

}

export default RequestingOrderStore;
