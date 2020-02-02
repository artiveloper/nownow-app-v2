import {computed, extendObservable} from "mobx";
import {fn_dateTimeToFormatted} from "../utils/Utils";

class PointModel {

    constructor(data) {
        extendObservable(this, data)
    }

    @computed
    get computedDate() {
        return fn_dateTimeToFormatted(this.createdDate);
    }

}

export default PointModel;
