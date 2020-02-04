import React from "react";
import {StyleSheet} from 'react-native';
import {Layout, Tab, TabView, Text} from "@ui-kitten/components";
import RequestingOrderList from "../components/RequestingOrderList";
import CompletedOrderList from "../components/CompletedOrderList";
import Reactotron from 'reactotron-react-native';
import {inject, observer} from "mobx-react";
import TradingOrderList from "../components/TradingOrderList";
import {ROOT_HEADER_TITLE_SIZE} from "../constants/Layouts";

class TransactionScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '거래내역',
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
                    <Tab title='거래 요청 중' style={styles.tab}>
                        <Layout style={styles.tabContent}>
                            <RequestingOrderList/>
                        </Layout>
                    </Tab>
                    <Tab title='거래 중' style={styles.tab}>
                        <Layout style={styles.tabContent}>
                            <TradingOrderList/>
                        </Layout>
                    </Tab>
                    <Tab title='거래 완료' style={styles.tab}>
                        <Layout style={styles.tabContent}>
                            <CompletedOrderList/>
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


export default inject("requestingOrderStore", "tradingOrderStore", "completedOrderStore")(observer(TransactionScreen));
