import React from 'react';
import {light as lightTheme, mapping} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {AppNavigator} from "./src/navigator/AppNavigator";
import RootStore from "./src/stores/RootStore";
import {Provider} from "mobx-react";
import Reactotron from 'reactotron-react-native'

const rootStore = new RootStore();

Reactotron
    .configure({
        // host: '172.16.20.12'
        //host: '192.168.123.105'
        host: '192.168.0.2'
    }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider mapping={mapping} theme={lightTheme}>
                    <Provider {...rootStore}>
                        <AppNavigator/>
                    </Provider>
                </ApplicationProvider>
            </React.Fragment>
        )
    }

}

export default App;
