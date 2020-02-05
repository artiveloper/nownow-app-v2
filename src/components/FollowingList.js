import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from "mobx-react";
import FollowingListItem from "./FollowingListItem";
import debounce from "lodash.debounce";
import Reactotron from 'reactotron-react-native'
import {Layout, Spinner, Text} from "@ui-kitten/components";

class FollowingList extends React.Component {

    async componentDidMount() {
        await this.props.followStore.getFollows();
    }

    handleLoadMore = async () => {
        if(this.props.followStore.follows.length > 10) return;
        await this.props.followStore.getFollows();
    };

    handleRefresh = async () => {
        await this.props.followStore.refreshFollows();
    };

    renderItem = ({item}) => {
        return (
            <FollowingListItem item={item}/>
        )
    };

    render() {

        const {inProgress, refreshing, follows, rowCnt} = this.props.followStore;

        if (inProgress) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        }

        return (
            <FlatList
                data={follows}
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

export default inject('followStore')(observer(FollowingList));
