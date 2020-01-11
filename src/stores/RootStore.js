import AuthStore from "./AuthStore";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";

class RootStore {

    constructor() {
        this.authStore = new AuthStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
    }

}

export default RootStore;
