import React from 'react';
import {Button, Divider, Layout, Modal, Spinner, Text} from "@ui-kitten/components";
import {Image, Linking, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {BackIcon, CloseButton, SelectPhotoButton, SubmitPostButton} from "../components/Icons";
import {CONTAINER_SIZE} from "../constants/Layouts";
import * as Permissions from "expo-permissions";
import {inject, observer} from "mobx-react";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {getFormattedPoint} from "../utils/Utils";
import {ImageBrowser} from 'expo-multiple-media-imagepicker';
import Reactotron from 'reactotron-react-native'
import ProgressCircle from 'react-native-progress-circle'

class AddPostScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        if (navigation.getParam('imageBrowserOpen')) {
            return {headerShown: false}
        }

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
                    onPress={() => navigation.state.params.handleSubmit()}>
                    <Text>완료</Text>
                </TouchableOpacity>
            )
        }
    };

    async componentDidMount() {
        this.props.addPostStore.clear();
        this.props.navigation.setParams({
            clearStore: this.clearStore,
            handleSubmit: this.handleSubmit
        });
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
        this.props.addPostStore.setPostType(type);
    };

    openImageBrowser = () => {
        this.props.navigation.setParams({
            'imageBrowserOpen': true
        });
        this.props.addPostStore.setImageBrowserOpenStatus(true);
    };

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            this.props.addPostStore.setImages(photos);
            this.props.navigation.setParams({
                'imageBrowserOpen': false
            });
        }).catch((e) => Reactotron.log(e))
    };

    removeSelectedImage = (idx) => {
        this.props.addPostStore.removeFromImages(idx);
    };

    clearStore = () => {
        this.props.addPostStore.clear();
    };

    handleSubmit = async () => {
        if (this.props.addPostStore.isValid()) {
            await this.props.addPostStore.submit();
            this.props.navigation.navigate('HomeScreen');
        }
    };

    render() {

        const {inProgress, title, postType, price, content, images, imageBrowserOpen, uploadedImageUrls, imageUploadProgress} = this.props.addPostStore;

        if (imageBrowserOpen) {
            return (
                <>
                    <StatusBar
                        barStyle="dark-content" // ios
                        backgroundColor='white'/>

                    <ImageBrowser
                        max={3 - images.length} // Maximum number of pickable image. default is None
                        headerCloseText={'닫기'} // Close button text on header. default is 'Close'.
                        headerDoneText={'완료'} // Done button text on header. default is 'Done'.
                        headerButtonColor={'#3366FF'} // Button color on header.
                        headerSelectText={'최대 3개 선택'} // Word when picking.  default is 'n selected'.
                        badgeColor={'#3366FF'} // Badge color when picking.
                        callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
                    />
                </>
            )
        }

        return (
            <>
                <StatusBar
                    barStyle="dark-content" // ios
                    backgroundColor='white'/>
                <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}} pointerEvents={inProgress ? "none" : ''}>
                    <Layout style={styles.container}>
                        <Layout style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15}}>
                            <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button
                                    onPress={this.openImageBrowser}
                                    style={styles.selectPhotoButton}
                                    appearance='outline'
                                    status='basic'
                                    icon={SelectPhotoButton}
                                />
                                <Text>{images.length} / 3</Text>
                            </Layout>
                            <ScrollView horizontal={true}
                                        contentContainerStyle={{alignItems: 'center'}}>
                                {
                                    images.map((image, idx) => {
                                        return (
                                            <Layout
                                                key={idx.toString()}>
                                                <Image
                                                    source={{uri: image.uri}}
                                                    style={{
                                                        height: 75,
                                                        width: 75,
                                                        marginLeft: 10,
                                                        borderRadius: 5
                                                    }}/>
                                                <TouchableOpacity
                                                    style={{position: 'absolute', right: 0, top: 0, bottom: 0}}
                                                    onPress={() => this.removeSelectedImage(idx)}>
                                                    <CloseButton/>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{position: 'absolute', right: 0, top: 0, bottom: 0}}
                                                    onPress={() => this.removeSelectedImage(idx)}>

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
                                    ? <Text status='info'>대여는 1일 사용 기준으로 비용을 입력해주세요.</Text>
                                    : null
                            }

                            <Layout style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>

                                <TextInput
                                    style={{
                                        height: 50,
                                        fontSize: 18,
                                        marginVertical: 10,
                                        width: '50%'
                                    }}
                                    onChangeText={this.handleInputPrice}
                                    placeholder='금액'
                                    numericvalue
                                    keyboardType={'numeric'}
                                    value={!price ? '' : getFormattedPoint(price)}
                                />

                                <Text category='s1'>원(￦)</Text>

                            </Layout>

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
                                numberOfLines={15}
                            />

                        </Layout>
                    </Layout>

                    <Modal
                        backdropStyle={styles.backdrop}
                        visible={inProgress}>
                        <Layout
                            level='3'
                            style={styles.modalContainer}>

                            <ProgressCircle
                                percent={imageUploadProgress}
                                radius={50}
                                borderWidth={8}
                                color="#3399FF"
                                shadowColor="#999"
                                bgColor="#fff">
                                <Text style={{fontSize: 18}}>{imageUploadProgress}%</Text>
                            </ProgressCircle>

                            <Text style={{paddingVertical: 5}}>{uploadedImageUrls.length + 1} / {images.length} 번째 이미지
                                업로드중...</Text>

                            <Text style={{paddingVertical: 5}}>잠시만 기다려주세요...</Text>

                            <Text style={{paddingVertical: 5}}>업로드 속도는 업데이트 예정입니다 :) </Text>

                        </Layout>
                    </Modal>

                </KeyboardAwareScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CONTAINER_SIZE,
        flex: 1
    },
    selectPhotoButton: {
        width: 55,
        height: 55
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        padding: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

});

export default inject('permissionStore', 'addPostStore')(observer(AddPostScreen));
