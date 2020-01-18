import {computed, extendObservable} from "mobx";
import {fn_dateTimeToFormatted} from "../utils/Utils";

class PostModel {

    constructor(data) {
        extendObservable(this, data);
    }

    @computed
    get thumbnail() {
        let splited = this.imagePaths[0].split('/upload/');
        return splited[0] + "/upload/c_scale,h_80,w_80/" + splited[1];
    }

    @computed
    get computedPrice() {
        let price = 0;
        if (this.postType === 'sale') {
            price = `${getFormattedPoint(this.price)}원`
        } else {
            price = `${getFormattedPoint(this.price)}원(일)`
        }
        return price;
    }

    @computed
    get computedPostType() {
        if (this.postType === 'sale') {
            return "판매"
        } else {
            return "대여"
        }
    }

    @computed
    get computedDate() {
        return fn_dateTimeToFormatted(this.createdDate);
    }

}

const getFormattedPoint = (point) => {
    return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

export default PostModel;
