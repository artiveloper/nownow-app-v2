import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from "mobx-react";
import debounce from 'lodash.debounce'
import PostListItem from "./PostListItem";
import {Button, Layout, Spinner, Text} from "@ui-kitten/components";
import Reactotron from 'reactotron-react-native';

class PostList extends React.Component {

    async componentDidMount() {
        await this.props.postStore.getPosts();
    }

    handleLoadMore = async () => {
        await this.props.postStore.getPosts();
    };

    handleRefresh = async () => {
        await this.props.postStore.refresh();
    };

    renderItem = ({item}) => {
        return (
            <PostListItem item={item}/>
        )
    };

    render() {
        const {inProgress, error, posts, rowCnt, refreshing} = this.props.postStore;

        if (error) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>게시글을 가져오는데 실패했습니다 :(</Text>
                    <Button
                        style={{marginTop: 10}}
                        onPress={this.handleRefresh}>새로고침</Button>
                </Layout>
            )
        }

        if (inProgress) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        }

        return (
            <FlatList
                data={posts}
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

export default inject('postStore')(observer(PostList));
