import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from "mobx-react";
import debounce from 'lodash.debounce'
import {Layout, Spinner, Text} from "@ui-kitten/components";
import CompletedOrderListItem from "./CompletedOrderListItem";
import Reactotron from 'reactotron-react-native';

class CompletedOrderList extends React.Component {

    async componentDidMount() {
        await this.props.completedOrderStore.refresh();
    }

    handleLoadMore = async () => {
        if (this.props.completedOrderStore.completedList.length < 10) return;
        await this.props.completedOrderStore.getCompletedList();
    };

    handleRefresh = async () => {
        await this.props.completedOrderStore.refresh();
    };

    renderItem = ({item}) => {
        return (
            <CompletedOrderListItem item={item}/>
        )
    };

    render() {
        const {inProgress, completedList, rowCnt, refreshing} = this.props.completedOrderStore;

        if (inProgress) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        } else if (completedList.length === 0) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>거래 완료된 내역이 없습니다 :D</Text>
                </Layout>
            )
        } else {
            return (
                <FlatList
                    data={completedList}
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

export default inject('completedOrderStore')(observer(CompletedOrderList));
