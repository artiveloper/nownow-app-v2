import React from 'react';
import {light as lightTheme, mapping} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {AppNavigator} from "./src/navigator/AppNavigator";

const App = () => (
    <React.Fragment>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <AppNavigator/>
        </ApplicationProvider>
    </React.Fragment>
);

export default App;
