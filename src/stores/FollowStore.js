import {action, observable} from "mobx";
import Reactotron from 'reactotron-react-native'
import {AsyncStorage} from "react-native";
import FollowRepository from "../repository/FollowRepository";

class FollowStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable
    inProgress = false;

    @observable
    errors = undefined;

    @observable
    refreshing = false;

    @observable
    contacts = [];

    @observable
    follows = [];

    @observable
    lastNum = 0;

    @observable
    rowCnt = 20;

    @action
    setContacts = async (contacts) => {
        // todo call api after check data length.
        try {
            this.inProgress = true;

            this.contacts = contacts.map(contact => {
                const result = {};
                if (contact.name) {
                    result['name'] = contact.name;
                }
                if (contact.phoneNumbers && contact.phoneNumbers[0]) {
                    let phoneNumber = contact.phoneNumbers[0];
                    result['phoneNumber'] = phoneNumber.digits ? this.replacePhoneNumber(phoneNumber.digits) : this.replacePhoneNumber(phoneNumber.number)
                }
                return result;
            });

            let token = await AsyncStorage.getItem("token");
            await FollowRepository.saveFollows(token, this.contacts)
        } catch (e) {
            this.errors = true;
        } finally {
            this.inProgress = false;
        }
    };

    @action
    getFollows = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await FollowRepository.getFollows(token, this.lastNum, this.rowCnt);
            this.follows = this.refreshing
                ? data
                : this.follows.concat(data);
            this.lastNum += 1;
            Reactotron.log("data : ", data);
        } catch (e) {
            this.error = true;
        } finally {
            if (this.follows.length > 1) {
                this.lastNum = this.follows[this.follows.length - 1].followId;
            }
            this.refreshing = false;
        }
    };

    @action
    refreshFollows = async () => {
        this.refreshing = true;
        this.lastNum = 0;
        await this.getFollows();
    };

    replacePhoneNumber = (phoneNumber) => {
        let replacedPhoneNumber = phoneNumber.replace(/-/gi, "");
        let indexOf = replacedPhoneNumber.indexOf("+82");
        if (indexOf !== -1) {
            replacedPhoneNumber = replacedPhoneNumber.replace("+82", "0").replace(/(\s*)/g, "")
        }
        return replacedPhoneNumber;
    };

}

export default FollowStore;
