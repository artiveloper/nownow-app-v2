import {action, observable} from "mobx";
import UserRepository from "../repository/UserRepository";
import Reactotron from 'reactotron-react-native'

class UserStore {

    @observable inProgress = false;
    @observable currentUser;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action pullUser = async () => {
        try {
            const {data} = await UserRepository.findUser(this.rootStore.commonStore.token);
            Reactotron.log('userInfo', data);
        } catch (e) {

        } finally {

        }
    }

}

export default UserStore;
