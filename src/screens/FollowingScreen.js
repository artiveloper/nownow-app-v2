import React from "react";
import {inject, observer} from "mobx-react";
import FollowingList from "../components/FollowingList";
import {CONTAINER_SIZE, ROOT_HEADER_TITLE_SIZE} from "../constants/Layouts";
import {TouchableOpacity, View} from "react-native";
import {SyncContactIcon} from "../components/Icons";
import * as Contacts from "expo-contacts";

class FollowingScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '친구',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: ROOT_HEADER_TITLE_SIZE
            },
            headerTitleAlign: 'left',
            headerRight: () => (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{marginRight: CONTAINER_SIZE}}
                        onPress={() => navigation.state.params.syncContacts()}>
                        <SyncContactIcon/>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({"syncContacts": this.syncContacts});
    }

    syncContacts = async () => {
        await this.fetchContacts();
    };

    fetchContacts = async () => {
        const {data} = await Contacts.getContactsAsync({fields: [Contacts.Fields.PhoneNumbers]});
        await this.props.followStore.setContacts(data)
    };

    render() {
        return (
            <FollowingList/>
        )
    }

}

export default inject('followStore')(observer(FollowingScreen));
