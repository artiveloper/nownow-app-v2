import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from "mobx-react";
import debounce from 'lodash.debounce'
import {Layout, Spinner, Text} from "@ui-kitten/components";
import TradingOrderListItem from "./TradingOrderListItem";

class TradingOrderList extends React.Component {

    async componentDidMount() {
        await this.props.tradingOrderStore.refresh();
    }

    handleLoadMore = async () => {
        if (this.props.tradingOrderStore.tradingList.length < 4) return;
        await this.props.tradingOrderStore.getTradingList();
    };

    handleRefresh = async () => {
        await this.props.tradingOrderStore.refresh();
    };

    renderItem = ({item}) => {
        return (
            <TradingOrderListItem item={item}/>
        )
    };

    render() {
        const {inProgress, tradingList, rowCnt, refreshing} = this.props.tradingOrderStore;

        if (inProgress) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        } else if (tradingList.length === 0) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>거래 중인 내역이 없습니다 :D</Text>
                </Layout>
            )
        } else {
            return (
                <FlatList
                    data={tradingList}
                    initialNumToRender={rowCnt}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={debounce(this.handleLoadMore, 500)}
                    onEndReachedThreshold={0.01}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                />
            );
        }
    }

}

export default inject('tradingOrderStore')(observer(TradingOrderList));
