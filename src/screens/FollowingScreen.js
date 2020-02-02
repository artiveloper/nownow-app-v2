import React from "react";
import {Layout, Spinner, Text} from "@ui-kitten/components";
import {inject, observer} from "mobx-react";
import FollowingList from "../components/FollowingList";
import {ROOT_HEADER_TITLE_SIZE} from "../constants/Layouts";

class FollowingScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '친구',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: ROOT_HEADER_TITLE_SIZE
            },
            headerTitleAlign: 'left',
        }
    };

    render() {
        return (
            <FollowingList/>
        )
    }

}

export default inject('followStore')(observer(FollowingScreen));
