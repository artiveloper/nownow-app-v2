import React from "react";
import {Layout, Tab, TabView} from "@ui-kitten/components";
import {ROOT_HEADER_TITLE_SIZE} from "../constants/Layouts";
import {StyleSheet} from "react-native";
import PointHistoryList from "../components/PointHistoryList";
import MyPostList from "../components/MyPostList";

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

    state = {
        selectedIndex: 0
    };

    handleTabIndex = async (selectedIndex) => {

        this.setState({
            selectedIndex
        });
    };

    shouldLoadComponent = (index) => index === this.state.selectedIndex;

    render() {
        return (
            <Layout style={{flex: 1}}>
                <TabView
                    tabBarStyle
                    selectedIndex={this.state.selectedIndex}
                    onSelect={this.handleTabIndex}
                    shouldLoadComponent={this.shouldLoadComponent}>
                    <Tab title='거래 내역' style={styles.tab}>
                        <Layout style={styles.tabContent}>
                            <PointHistoryList/>
                        </Layout>
                    </Tab>
                    <Tab title='내 글 목록' style={styles.tab}>
                        <Layout style={styles.tabContent}>
                            <MyPostList/>
                        </Layout>
                    </Tab>
                </TabView>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        padding: 10,
    },
    tabContent: {
        height: '100%'
    }
});

export default MyInfoScreen;
