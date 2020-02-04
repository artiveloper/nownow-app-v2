import React from 'react';
import {inject, observer} from "mobx-react";
import {Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {CONTAINER_SIZE, width} from "../constants/Layouts";
import {BackIcon, DeleteButton} from "../components/Icons";
import {Button, Layout, Spinner, Text} from "@ui-kitten/components";
import Reactotron from 'reactotron-react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

class PostDetailScreen extends React.Component {

    state = {
        activeSlide: 0
    };

    static navigationOptions = ({navigation}) => {
        let handleDeletePost = navigation.getParam('handleDeletePost');
        return {
            title: '게시글 상세내용',
            headerLeft: () => (
                <TouchableOpacity
                    style={{marginLeft: CONTAINER_SIZE}}
                    onPress={() => navigation.goBack(null)}>
                    <BackIcon/>
                </TouchableOpacity>
            ),
            headerRight: () => {
                if (handleDeletePost) {
                    return (
                        <TouchableOpacity
                            style={{marginRight: CONTAINER_SIZE}}
                            onPress={() => handleDeletePost()}>
                            <DeleteButton/>
                        </TouchableOpacity>
                    )
                }
            }
        }
    };

    async componentDidMount() {
        const {userStore, postStore, navigation} = this.props;
        let postId = navigation.getParam("postId");
        await postStore.getPost(postId);

        if (postStore.post.writerId == userStore.userId) {
            navigation.setParams({'handleDeletePost': this.handleDeletePost});
        }
    }

    handleDeletePost = () => {
        Alert.alert(
            '등록된 게시글을 지우시겠습니까?',
            '지워진 게시물은 복원되지 않습니다.',
            [
                {
                    text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',
                },
                {text: 'OK', onPress: this.deletePost},
            ],
            {cancelable: false},
        );
    };

    deletePost = async () => {
        await this.props.postStore.deleteCurrentPost();
        this.props.navigation.navigate("HomeScreen");
    };

    _renderItem({item, index}) {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: 375, height: 300}} source={{uri: item}}/>
            </View>
        )
    }

    handleOrderSubmit = () => {
        const {navigation, orderStore, postStore} = this.props;
        orderStore.setOrder(postStore.post);
        navigation.navigate("OrderScreen");
    };

    render() {

        const {userId} = this.props.userStore;
        const {postDetailLoading, post} = this.props.postStore;
        const {activeSlide} = this.state;

        if (postDetailLoading) {
            return (
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner/>
                </Layout>
            )
        }

        return (
            <Layout style={{flex: 1}}>
                <ScrollView>
                    {
                        post.imagePaths ?
                            <Layout>
                                <Carousel
                                    ref={ref => this.carousel = ref}
                                    data={post.detailImages}
                                    sliderWidth={width}
                                    itemWidth={width}
                                    renderItem={this._renderItem}
                                    onSnapToItem={(index) => this.setState({activeSlide: index})}
                                />

                                {
                                    post.imagePaths.length !== 1 ?
                                        <Pagination
                                            activeDotIndex={activeSlide}
                                            dotsLength={post.imagePaths.length}
                                            dotColor='black'
                                            inactiveDotColor='gray'
                                        />
                                        : <View style={{paddingVertical: 10}}/>

                                }
                            </Layout>
                            : null
                    }

                    <Layout style={styles.contentContainer}>

                        <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text category='h6'>{post.computedPrice}</Text>
                            <Text style={{marginLeft: 10}} category='h6'>{post.computedPostType}</Text>
                        </Layout>

                        <Layout style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text appearance='hint' category='s2'>{post.writerName} | </Text>
                            <Text appearance='hint' category='s2'>{post.computedDate}</Text>
                        </Layout>

                        <Text style={{paddingVertical: 10}} category='h5'>{post.title}</Text>

                        <Text category='s1'>{post.content}</Text>

                    </Layout>
                </ScrollView>

                {
                    post.writerId == userId || post.status === 'trading' ? null :
                        <Layout>
                            <Button
                                onPress={this.handleOrderSubmit}
                                style={{paddingBottom: 30}}>거래 요청</Button>
                        </Layout>
                }
            </Layout>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: CONTAINER_SIZE
    },
    postImage: {
        width: '100%',
        height: 300,
        marginVertical: 10
    },
});

export default inject('orderStore', 'userStore', 'postStore')(observer(PostDetailScreen));
