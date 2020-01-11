import {Button, Icon, Layout} from "@ui-kitten/components";
import {Text} from "react-native";
import React from "react";
import {inject, observer} from "mobx-react";

export const FacebookIcon = (style) => (
    <Icon name='facebook' {...style} />
);

export const LoginButton = () => (
    <Button icon={FacebookIcon}>Login with Facebook</Button>
);

class HomeScreen extends React.Component {

    render() {

        const {token} = this.props.commonStore;

        return (
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category='h1'>HomeScreen</Text>
                <Text>{token}</Text>
                <LoginButton/>
            </Layout>
        )
    }

}

export default inject('commonStore')(observer(HomeScreen));
