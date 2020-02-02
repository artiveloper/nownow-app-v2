import {computed, extendObservable} from "mobx";
import {fn_dateTimeToFormatted} from "../utils/Utils";
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get("screen");
import Reactotron from 'reactotron-react-native';

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
    get detailImages() {
        let result = [];

        this.imagePaths.map(image => {
            let splited = image.split('/upload/');
            let imageWidth = Math.floor(width);
            let s = splited[0] + `/upload/c_scale,h_300,w_${imageWidth}/` + splited[1];
            result.push(s)
        });

        return result;
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
