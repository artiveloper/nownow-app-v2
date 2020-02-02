import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from "mobx-react";
import debounce from 'lodash.debounce'
import {Layout, Spinner, Text} from "@ui-kitten/components";
import PointHistoryListItem from "./PointHistoryListItem";

class PointHistoryList extends React.Component {

    async componentDidMount() {
        await this.props.pointStore.refresh();
    }

    handleLoadMore = async () => {
        if (this.props.pointStore.pointHistory.length < 4) return;
        await this.props.pointStore.getHistory();
    };

    handleRefresh = async () => {
        await this.props.pointStore.refresh();
    };

    renderItem = ({item}) => {
        return (
            <PointHistoryListItem item={item}/>
        )
    };

    render() {
        const {inProgress, pointHistory, rowCnt, refreshing} = this.props.pointStore;

        if (inProgress) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        }

        if (pointHistory.length === 0) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>거래 내역이 없습니다 :D</Text>
                </Layout>
            )
        }

        return (
            <FlatList
                data={pointHistory}
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

export default inject('pointStore')(observer(PointHistoryList));
