import {action, observable, reaction} from "mobx";
import {AsyncStorage} from 'react-native';
import Reactotron from 'reactotron-react-native'

class CommonStore {

    @observable token = '';

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    setToken = async (token) => {
        await AsyncStorage.setItem('token', token);
        this.token = token;
    };

}

export default CommonStore;
