import React from 'react';
import {light as lightTheme, mapping} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {AppNavigator} from "./src/navigator/AppNavigator";

import RootStore from "./src/stores/RootStore";
import {Provider} from "mobx-react";

const rootStore = new RootStore();

const App = () => (
    <React.Fragment>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Provider {...rootStore}>
                <AppNavigator/>
            </Provider>
        </ApplicationProvider>
    </React.Fragment>
);

export default App;
