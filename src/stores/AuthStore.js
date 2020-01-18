import {action, observable} from "mobx";
import Reactotron from 'reactotron-react-native';
import AuthRepository from "../repository/AuthRepository";
import CommonStore from "./CommonStore";
import {AsyncStorage} from "react-native-web";

class AuthStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    //flag
    @observable inProgress = false;
    @observable errors = undefined;
    @observable isSendAuthCodeRequest = false;

    //values
    @observable phoneNumber = '';
    @observable nickName = '';
    @observable authCode;
    @observable inputAuthCode = '';

    @observable minutes = 3;
    @observable seconds = 0;

    @action
    sendAuthCode = () => {
        Reactotron.log(`이름 : ${this.nickName}`);
        Reactotron.log(`휴대폰 번호 : ${this.phoneNumber}`);

        this.nickName = this.nickName.trim();
        this.phoneNumber = this.phoneNumber.trim();

        if (this.nickName == null || this.nickName === "") {
            alert("이름을 입력해주세요.");
            return;
        }

        if (this.phoneNumber.length < 10) {
            alert("휴대폰 번호를 확인해주세요.");
            return;
        }

        this.myInterval = setInterval(this.tick, 1000);
        this.authCode = '12345';
        this.isSendAuthCodeRequest = true;

    };

    tick = () => {
        if (this.seconds > 0) {
            this.seconds = this.seconds - 1;
        }
        if (this.seconds === 0) {
            if (this.minutes === 0) {
                clearInterval(this.myInterval);
                this.isSendAuthCodeRequest = false;
            } else {
                this.minutes = this.minutes - 1;
                this.seconds = 59
            }
        }
    };

    @action
    login = async () => {
        if (this.inputAuthCode == null || this.inputAuthCode === "") {
            alert("인증코드를 정확하게 입력해주세요");
            return
        }

        try {
            this.inProgress = true;
            this.errors = undefined;

            const {data} = await AuthRepository.login(this.nickName, this.phoneNumber);
            await AsyncStorage.setItem('token', data.accessToken);

        } catch (e) {
            this.errors = e.response;
        } finally {
            this.inProgress = false;
        }

    };

    @action
    setPhoneNumber = (phoneNumber) => {
        this.phoneNumber = phoneNumber
    };

    @action
    setNickName = (nickName) => {
        this.nickName = nickName;
    };

    @action
    setInputAuthCode = (inputAuthCode) => {
        this.inputAuthCode = inputAuthCode
    };

}

export default AuthStore;
