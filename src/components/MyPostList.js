import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from "mobx-react";
import debounce from 'lodash.debounce'
import {Layout, Spinner, Text} from "@ui-kitten/components";
import MyPostListItem from "./MyPostListItem";

class MyPostList extends React.Component {

    async componentDidMount() {
        await this.props.userStore.refreshMyPosts();
    }

    handleLoadMore = async () => {
        if (this.props.userStore.myPosts.length < 10) return;
        await this.props.userStore.getMyPosts();
    };

    handleRefresh = async () => {
        await this.props.userStore.refreshMyPosts();
    };

    renderItem = ({item}) => {
        return (
            <MyPostListItem item={item}/>
        )
    };

    render() {
        const {myPostsLoading, myPosts, myPostRowCnt, refreshing} = this.props.userStore;

        if (myPostsLoading) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        } else if (myPosts.length === 0) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>내가 쓴 글이 없습니다 :D</Text>
                </Layout>
            )
        } else {
            return (
                <FlatList
                    data={myPosts}
                    initialNumToRender={myPostRowCnt}
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

export default inject('userStore')(observer(MyPostList));
