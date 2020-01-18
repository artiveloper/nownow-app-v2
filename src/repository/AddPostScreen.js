import React from 'react';
import {Button, Divider, Input, Layout, Select, Text} from "@ui-kitten/components";
import {Image, Linking, View, ScrollView, TextInput, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import {BackIcon, CloseButton, SelectPhotoButton, SubmitPostButton} from "../components/Icons";
import {CONTAINER_SIZE} from "../constants/Layouts";
import * as Permissions from "expo-permissions";
import {inject, observer} from "mobx-react";
import Reactotron from 'reactotron-react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {getFormattedPoint} from "../utils/Utils";

class AddPostScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '게시글 등록',
            headerLeft: () => (
                <TouchableOpacity
                    style={{marginLeft: CONTAINER_SIZE}}
                    onPress={() => navigation.goBack(null)}>
                    <BackIcon/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{marginRight: CONTAINER_SIZE}}
                    onPress={() => console.log}>
                    <SubmitPostButton/>
                </TouchableOpacity>
            )
        }
    };

    state = {};

    postTypeOptions = [
        {text: '판매'},
        {text: '대여'},
    ];

    async componentDidMount() {
        await this.fetchCameraRollPermission();

    }

    fetchCameraRollPermission = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.props.permissionStore.setCameraRollPermission(cameraRollPermission.status);
        if (this.props.permissionStore.cameraRollPermission !== 'granted') {
            Linking.openURL('app-settings:');
            return;
        }
    };

    handleInputTitle = (title) => {
        this.props.addPostStore.setTitle(title);
    };

    handleInputPrice = (price) => {
        this.props.addPostStore.setPrice(price);
    };

    handleInputContent = (content) => {
        this.props.addPostStore.setContent(content);
    };

    handlePostType = (type) => {
        Reactotron.log(type);
        this.props.addPostStore.setPostType(type);
    };

    render() {

        const {title, postType, price, content} = this.props.addPostStore;
        const images = ['https://via.placeholder.com/45/92c952', 'https://via.placeholder.com/45/92c952'];

        return (
            <>
                <StatusBar
                    barStyle="dark-content" // ios
                    backgroundColor='white'/>

                <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
                    <Layout style={styles.container}>
                        <Layout style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15}}>
                            <TouchableOpacity onPress={() => console.log}>
                                <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Button
                                        style={styles.selectPhotoButton}
                                        status='basic'
                                        appearance='outline'
                                        icon={SelectPhotoButton}/>
                                </Layout>
                            </TouchableOpacity>
                            <ScrollView horizontal={true}
                                        contentContainerStyle={{alignItems: 'center'}}>
                                {
                                    images.map(image => {
                                        return (
                                            <Layout>
                                                <Image
                                                    key={image.toString()}
                                                    source={{uri: image}}
                                                    style={{
                                                        height: 75,
                                                        width: 75,
                                                        marginLeft: 15,
                                                    }}/>
                                                <TouchableOpacity
                                                    style={{position: 'absolute', right: 0, top: 0, bottom: 0}}
                                                    onPress={() => console.log}>
                                                    <CloseButton/>
                                                </TouchableOpacity>
                                            </Layout>
                                        )
                                    })
                                }
                            </ScrollView>
                        </Layout>

                        <Layout>

                            <TextInput
                                style={{
                                    height: 50,
                                    fontSize: 18,
                                    marginVertical: 10
                                }}
                                onChangeText={this.handleInputTitle}
                                placeholder='제목'
                                value={title}
                            />

                            <Divider/>

                            <Layout style={{flexDirection: 'row', marginVertical: 20}}>
                                <Button style={{width: '50%', borderRadius: 0}}
                                        status={postType === 'sale' ? 'primary' : 'basic'}
                                        size='large'
                                        onPress={() => this.handlePostType('sale')}>
                                    판매
                                </Button>
                                <Button style={{width: '50%', borderRadius: 0}}
                                        status={postType === 'rental' ? 'primary' : 'basic'}
                                        size='large'
                                        onPress={() => this.handlePostType('rental')}>
                                    대여
                                </Button>
                            </Layout>

                            <Divider/>

                            {
                                postType === 'rental'
                                    ? <Text status='info'>대여는 1일 사용 기준, 거래 비용을 입력해주세요.</Text>
                                    : null
                            }

                            <TextInput
                                style={{
                                    height: 50,
                                    fontSize: 18,
                                    marginVertical: 10
                                }}
                                onChangeText={this.handleInputPrice}
                                placeholder='금액'
                                numericvalue
                                keyboardType={'numeric'}
                                value={!price ? '' : getFormattedPoint(price)}
                            />

                            <Divider/>

                            <TextInput
                                style={{
                                    height: 150,
                                    fontSize: 18,
                                    marginTop: 20
                                }}
                                onChangeText={this.handleInputContent}
                                value={content}
                                placeholder='올릴 게시글의 내용을 작성해주세요 :)'
                                multiline
                                numberOfLines={10}
                            />

                        </Layout>
                    </Layout>
                </KeyboardAwareScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: CONTAINER_SIZE,
        flex: 1
    },
    selectPhotoButton: {
        width: 75,
        height: 75
    }

});

export default inject('permissionStore', 'addPostStore')(observer(AddPostScreen));
