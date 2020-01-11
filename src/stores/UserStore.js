import {observable} from "mobx";

class UserStore {

    constructor(rootStore) {

    }


    @observable
    accessToken = '';

}

export default UserStore;
