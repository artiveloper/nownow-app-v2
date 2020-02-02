import AuthStore from "./AuthStore";
import PostStore from "./PostStore";
import PermissionStore from "./PermissionStore";
import FollowStore from "./FollowStore";
import AddPostStore from "./AddPostStore";
import UserStore from "./UserStore";
import OrderStore from "./OrderStore";
import MessageStore from "./MessageStore";
import CompletedOrderStore from "./CompletedOrderStore";
import RequestingOrderStore from "./RequestingOrderStore";
import TradingOrderStore from "./TradingOrderStore";
import PointStore from "./PointStore";

class RootStore {

    constructor() {
        this.authStore = new AuthStore(this);
        this.userStore = new UserStore(this);
        this.postStore = new PostStore(this);
        this.permissionStore = new PermissionStore(this);
        this.followStore = new FollowStore(this);
        this.addPostStore = new AddPostStore(this);
        this.orderStore = new OrderStore(this);
        this.messeageStore = new MessageStore(this);
        this.requestingOrderStore = new RequestingOrderStore(this);
        this.tradingOrderStore = new TradingOrderStore(this);
        this.completedOrderStore = new CompletedOrderStore(this);
        this.pointStore = new PointStore(this);
    }

}

export default RootStore;
