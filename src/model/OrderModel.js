import {action, computed, extendObservable, observable} from "mobx";
import {getFormattedPoint} from "../utils/Utils";

class OrderModel {

    constructor(data) {
        extendObservable(this, data);
    }

    @observable
    rentDate = 1;

    @computed
    get computedPostType() {
        if (this.postType === 'sale') {
            return "판매"
        } else {
            return "대여"
        }
    }

    @computed
    get computedPrice() {
        let price = 0;
        if (this.postType === 'sale') {
            price = `${getFormattedPoint(this.price)}원`
        } else {
            price = `일 ${getFormattedPoint(this.price)}원`
        }
        return price;
    }

    @computed
    get totalPrice() {
        let totalPrice = (this.price * this.rentDate);
        return `${getFormattedPoint(totalPrice)}원`
    }

    @action
    increaseRentDate = () => {
        this.rentDate += 1;
    };

    @action
    decreaseRentDate = () => {
        if (this.rentDate > 1) {
            this.rentDate -= 1;
        }
    };

}

export default OrderModel;
