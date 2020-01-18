import {action, observable, reaction} from "mobx";
import Reactotron from 'reactotron-react-native'

class PermissionStore {

    @observable contactsPermission = '';
    @observable cameraRollPermission = '';

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    setContactsPermission = (permission) => {
        this.contactsPermission = permission;
    };

    @action
    setCameraRollPermission = (permission) => {
        this.cameraRollPermission = permission;
    }

}

export default PermissionStore;
