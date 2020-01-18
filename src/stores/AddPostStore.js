import {action, observable, reaction} from "mobx";

class AddPostStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable
    title = '';

    @observable
    postType = '';

    @observable
    price = '';

    @observable
    content = '';

    @action
    setTitle = (title) => {
        this.title = title;
    };

    @action
    setPostType = (postType) => {
        this.postType = postType;
    };

    @action
    setPrice = (price) => {
        this.price = price.toString().replace(/[^\d]+/g, '');
    };

    @action
    setContent = (content) => {
        this.content = content;
    };

    @action
    selectedSaleType = () => {
        this.postType = 'sale'
    };

    @action
    selectedRentalType = () => {
        this.postType = 'rental'
    };

}

export default AddPostStore;
