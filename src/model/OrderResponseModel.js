import {computed, extendObservable} from "mobx";
import {fn_dateTimeToFormatted, getFormattedPoint} from "../utils/Utils";


class OrderResponseModel {

    constructor(data) {
        extendObservable(this, data);
    }

    @computed
    get thumbnail() {
        let splited = this.postImagePaths[0].split('/upload/');
        return splited[0] + "/upload/c_scale,h_80,w_80/" + splited[1];
    }

    @computed
    get computedOrderType() {
        if (this.orderType === 'sale') {
            return "판매"
        } else {
            return "대여"
        }
    }

    /*@computed
    get computedDateTime() {
        return this.createdDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6');
    }*/

    @computed
    get computedDate() {
        return fn_dateTimeToFormatted(this.createdDate);
    }

    @computed
    get computedPrice() {
        let price = 0;
        if (this.orderType === 'sale') {
            price = `${getFormattedPoint(this.unitPrice)}원`
        } else {
            price = `일 ${getFormattedPoint(this.unitPrice)}원`
        }
        return price;
    }

    /*@computed
    get computedTotalPrice() {
        return `${getFormattedPoint(this.totalPrice)}원`;
    }*/

}

export default OrderResponseModel;
