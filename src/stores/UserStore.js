import {action, observable} from "mobx";
import {AsyncStorage} from "react-native";
import userRepository from "../repository/UserRepository";
import Reactotron from 'reactotron-react-native'

class UserStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable inProgress = false;

    @observable
    userId = '';

    @observable
    phoneNumber = '';

    @observable
    nickName = '';

    @observable
    point = 0;

    @observable
    myPostsLoading = false;

    @observable
    myPosts = [];

    @observable
    myPostLastNum = 0; // like page

    @observable
    myPostRowCnt = 10;

    @action
    getMyInfo = async () => {
        let data = null;
        try {

            let token = await AsyncStorage.getItem("token");
            const {data, status} = await userRepository.findUserByToken(token);

            this.userId = String(data.id);
            this.phoneNumber = data.phoneNumber;
            this.nickName = data.nickname;
            this.point = data.currentPoint;

            await AsyncStorage.setItem("userId", this.userId);
            await AsyncStorage.setItem("phoneNumber", this.phoneNumber);
            await AsyncStorage.setItem("nickName", this.nickName);
            await AsyncStorage.setItem("currentPoint", String(this.point));

        } catch (e) {
            Reactotron.log(e);
            await AsyncStorage.clear();
        } finally {

        }
    };

    @action
    getFriendInfo = async (friendId) => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await userRepository.findUserById(token, friendId);
            this.rootStore.messageStore.setDestNum(data.phoneNumber);
        } catch (e) {

        } finally {

        }
    };

    @action
    getMyPosts = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await userRepository.findAllMyPostList(token, this.myPostLastNum, this.myPostRowCnt);
            this.myPosts = this.refreshing
                ? data.map(post => new PostModel(post))
                : this.myPosts.concat(data.map(post => new PostModel(post)));
        } catch (e) {
            this.error = this.message;
        } finally {
            if (this.myPosts.length > 1) {
                this.myPostLastNum = this.myPosts[this.myPosts.length - 1].orderId;
            }
            this.refreshing = false;
        }
    };

    @action
    refreshMyPosts = async () => {
        this.refreshing = true;
        this.myPostLastNum = 0;
        await this.getMyPosts();
    }

}

export default UserStore;
