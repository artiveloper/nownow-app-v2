import AuthStore from "./AuthStore";
import CommonStore from "./CommonStore";
import PostStore from "./PostStore";
import PermissionStore from "./PermissionStore";
import FollowStore from "./FollowStore";
import AddPostStore from "./AddPostStore";

class RootStore {

    constructor() {
        this.authStore = new AuthStore(this);
        this.commonStore = new CommonStore(this);
        this.postStore = new PostStore(this);
        this.permissionStore = new PermissionStore(this);
        this.followStore = new FollowStore(this);
        this.addPostStore = new AddPostStore(this);
    }

}

export default RootStore;
