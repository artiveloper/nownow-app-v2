import React from "react";
import {Layout, Text} from "@ui-kitten/components";
import {CONTAINER_SIZE, ROOT_HEADER_TITLE_SIZE} from "../constants/Layouts";
import {StyleSheet} from "react-native";
import MyPostList from "../components/MyPostList";
import {inject, observer} from "mobx-react";
import {getFormattedPoint} from "../utils/Utils";

class MyInfoScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '내정보',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: ROOT_HEADER_TITLE_SIZE
            },
            headerTitleAlign: 'left',
        }
    };

    render() {

        const {nickName, point} = this.props.userStore;

        return (
            <Layout style={styles.container}>
                <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text category='h3' style={{paddingVertical: 15}}>{nickName}</Text>
                </Layout>
                <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>현재 포인트</Text>
                    <Text category='h6' style={{paddingLeft: 5}}>{getFormattedPoint(point)}원</Text>
                </Layout>

                <Text category='h6' style={{paddingTop: 20}}>내가 쓴 글</Text>
                <MyPostList/>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: CONTAINER_SIZE
    }
});

export default inject('userStore')(observer(MyInfoScreen));
