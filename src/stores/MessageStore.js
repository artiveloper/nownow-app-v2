import {action, observable} from "mobx";

class MessageStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable
    destNum = '';

    @action
    setMessage = (message) => {
        this.message = message;
    };

    @action
    setDestNum = (destNum) => {
        this.destNum = destNum;
    };


}

export default MessageStore;
