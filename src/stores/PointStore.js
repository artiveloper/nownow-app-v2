import {AsyncStorage} from "react-native";
import {action, observable} from "mobx";
import pointHistoryRepository from '../repository/PointRepository';
import PointModel from "../model/PointModel";
import Reactotron from 'reactotron-react-native';

class PointStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable
    pointHistory = [];

    @observable
    lastNum = 0;

    @observable
    rowCnt = 10;

    @observable
    refreshing = false;

    @action
    getHistory = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await pointHistoryRepository.pointHistory(token, this.lastNum, 20);
            this.pointHistory = this.refreshing
                ? data.map(pointHistory => new PointModel(pointHistory))
                : this.pointHistory.concat(data.map(pointHistory => new PointModel(pointHistory)));
        } catch (e) {
            Reactotron.log(e)
        } finally {
            if (this.pointHistory.length > 1) {
                this.lastNum = this.pointHistory[this.pointHistory.length - 1].pointId;
            }
            this.refreshing = false;
        }
    };

    @action
    refresh = async () => {
        this.refreshing = true;
        this.lastNum = 0;
        await this.getHistory();
    }

}

export default PointStore;
