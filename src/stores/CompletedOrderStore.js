import {action, observable} from "mobx";
import orderRepository from '../repository/OrderRepository';
import {AsyncStorage} from "react-native";
import OrderResponseModel from "../model/OrderResponseModel";
import Reactotron from 'reactotron-react-native';

class  CompletedOrderStore {

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
    completedList = [];

    @observable
    completedLastNum = 0;

    rowCnt = 20;

    @action
    getCompletedList = async () => {
        try {
            this.inProgress = true;
            let token = await AsyncStorage.getItem("token");
            const {data} = await orderRepository.findAllCompleted(token, this.completedLastNum, this.rowCnt);
            this.completedList = this.refreshing
                ? data.map(completedOrder => new OrderResponseModel(completedOrder))
                : this.completedList.concat(data.map(completedOrder => new OrderResponseModel(completedOrder)));
        } catch (e) {
        } finally {
            if (this.completedList.length > 1) {
                this.completedLastNum = this.completedList[this.completedList.length - 1].orderId;
            }
            this.inProgress = false;
            this.refreshing = false;
        }
    };

    @action
    refresh = async () => {
        this.refreshing = true;
        this.completedLastNum = 0;
        await this.getCompletedList();
    };

}

export default CompletedOrderStore;
