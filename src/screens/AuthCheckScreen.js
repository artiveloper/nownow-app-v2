import React from 'react';
import {AsyncStorage, StatusBar} from "react-native";
import {Layout, Spinner} from "@ui-kitten/components";
import jwt from "jwt-decode";
import Reactotron from 'reactotron-react-native'
import {inject, observer} from "mobx-react";

class AuthCheckScreen extends React.Component {

    async componentDidMount() {

        const token = await AsyncStorage.getItem('token');

        let destination = '';

        Reactotron.log(token);

        if (token) {
            const decoded = jwt(token);
            const current_time = Date.now() / 1000;
            if ( decoded.exp < current_time) {
                destination = 'AuthScreen';
            }
            await this.props.userStore.getMyInfo();
            destination = '홈';
        } else {
            destination = 'AuthScreen';
        }

        this.props.navigation.navigate(destination);
    }

    render() {
        return (
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar barStyle="default"/>
                <Spinner/>
            </Layout>
        )
    }

}

export default inject('userStore')(observer(AuthCheckScreen));
