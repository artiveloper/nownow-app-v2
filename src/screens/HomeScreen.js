import {Button, Layout, Spinner, Text} from "@ui-kitten/components";
import {AsyncStorage, Linking, StatusBar, View, TouchableOpacity} from "react-native";
import React from "react";
import {inject, observer} from "mobx-react";
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import PostListView from "../components/PostList";
import {AddPostIcon} from "../components/Icons";
import {CONTAINER_SIZE, ROOT_HEADER_TITLE_SIZE} from "../constants/Layouts";
import Reactotron from 'reactotron-react-native';

class HomeScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '피드',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: ROOT_HEADER_TITLE_SIZE
            },
            headerTitleAlign: 'left',
            headerRight: () => (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{marginRight: CONTAINER_SIZE}}
                        onPress={() => navigation.navigate('AddPostScreen')}>
                        <AddPostIcon/>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    async componentDidMount() {

        const {contactsPermission} = this.props.permissionStore;
        if (contactsPermission !== 'granted') {
            await this.fetchContactsPermission();
            const {data} = await Contacts.getContactsAsync({fields: [Contacts.Fields.PhoneNumbers]});
            await this.props.followStore.setContacts(data)
        }

    }

    async fetchContactsPermission() {
        const contactPermission = await Permissions.askAsync(Permissions.CONTACTS);
        this.props.permissionStore.setContactsPermission(contactPermission.status);

        if (this.props.permissionStore.contactsPermission !== 'granted') {
            Linking.openURL('app-settings:');
            return;
        }
    }

    render() {
        const {contactsPermission} = this.props.permissionStore;
        const {inSyncProgress} = this.props.followStore;
        const {getPost} = this.props.postStore;

        if (inSyncProgress) {
            return (
                <>
                    <StatusBar
                        barStyle="dark-content" // ios
                        backgroundColor='white'/>
                    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner/>
                        <Text>연락처 동기화중...</Text>
                    </Layout>
                </>
            )
        }

        if (contactsPermission === 'granted') {
            return (
                <>
                    <StatusBar
                        barStyle="dark-content" // ios
                        backgroundColor='white'/>
                    <PostListView/>
                </>
            );
        }

        return (
            <>
                <StatusBar
                    barStyle="dark-content" // ios
                    backgroundColor='white'/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>연락처 접근 권한이 없습니다 :(</Text>
                    <Text>권한 설정 후 아래 '새로고침' 버튼을 눌러주세요.</Text>
                    <Button onPress={() => getPost}>새로고침</Button>
                </Layout>
            </>
        )
    }

}

export default inject('permissionStore', 'followStore', "postStore")(observer(HomeScreen));
