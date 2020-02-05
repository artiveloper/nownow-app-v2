import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from "mobx-react";
import debounce from 'lodash.debounce'
import {Button, Layout, Spinner, Text} from "@ui-kitten/components";
import RequestingOrderListItem from "./RequestingOrderListItem";
import {REQUESTING} from "../constants/Status";

class RequestingOrderList extends React.Component {

    async componentDidMount() {
        await this.props.requestingOrderStore.refresh();
    }

    handleLoadMore = async () => {
        if (this.props.requestingOrderStore.requestingList.length < 10) return;
        await this.props.requestingOrderStore.getRequestingList();
    };

    handleRefresh = async () => {
        await this.props.requestingOrderStore.refresh();
    };

    renderItem = ({item}) => {
        return (
            <RequestingOrderListItem item={item}/>
        )
    };

    render() {
        const {inProgress, requestingList, rowCnt, refreshing} = this.props.requestingOrderStore;

        if (inProgress) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        } else if (requestingList.length === 0) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>거래 요청 중인 내역이 없습니다 :D</Text>
                </Layout>
            )
        } else {
            return (
                <FlatList
                    data={requestingList}
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

export default inject('requestingOrderStore')(observer(RequestingOrderList));
