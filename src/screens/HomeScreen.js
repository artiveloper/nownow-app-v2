import {Button, Icon, Layout} from "@ui-kitten/components";
import {Text} from "react-native";
import React from "react";

export const FacebookIcon = (style) => (
    <Icon name='facebook' {...style} />
);

export const LoginButton = () => (
    <Button icon={FacebookIcon}>Login with Facebook</Button>
);

const HomeScreen = () => (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category='h1'>HomeScreen</Text>
        <LoginButton/>
    </Layout>
);

export default HomeScreen;
