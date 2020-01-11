import {observable} from "mobx";

class AuthStore {

    constructor(rootStore) {
    }

    @observable inProgress = false;
    @observable errors = undefined;
    @observable isSendGetAuthCodeRequest= false;

    @observable values = {
        phoneNumber: '',
        nickName: '',
        authCode: '',
        inputAuthCode: '',
    }

}

export default AuthStore;
