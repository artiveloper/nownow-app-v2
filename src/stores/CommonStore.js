import {observable} from "mobx";

class CommonStore {
    constructor(rootStore) {}

    @observable token = 'token'

}

export default CommonStore;
