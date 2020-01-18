import React from 'react';
import {inject, observer} from "mobx-react";
import {SafeAreaView, ScrollView, TouchableOpacity, default as StatusBar, StyleSheet} from 'react-native';
import {Button, Input, Layout, Spinner, Text} from "@ui-kitten/components";

class AuthScreen extends React.Component {

    handleInputName = (nickName) => this.props.authStore.setNickName(nickName);
    handleInputPhoneNumber = (phoneNumber) => this.props.authStore.setPhoneNumber(phoneNumber);
    handleSubmitAuthCode = () => {this.props.authStore.sendAuthCode()};
    handleAuthCodeInput = (inputAuthCode) => this.props.authStore.setInputAuthCode(inputAuthCode);
    handleStartNOWNOWButton = () => this.props.authStore.login();

    render() {

        const {inProgress, phoneNumber, nickName, isSendAuthCodeRequest, minutes, seconds, inputAuthCode} = this.props.authStore;

        return (
            inProgress ? <Spinner/>
                : <SafeAreaView style={styles.safeAreaContainer}>
                    <ScrollView style={styles.container}>

                        <Text category='h3'>나우나우 시작하기</Text>
                        <Text category='s1'>나우나우는 휴대폰 번호로 가입/시작해요 :)</Text>

                        <Layout style={styles.inputContainer}>
                            <Input
                                style={styles.input}
                                textStyle={styles.inputText}
                                size='large'
                                placeholder='이름(실명)'
                                value={nickName}
                                onChangeText={this.handleInputName}
                            />
                            <Input
                                style={styles.input}
                                textStyle={styles.inputText}
                                size='large'
                                placeholder="휴대폰 번호 ('-'를 제외하고 입력)"
                                value={String(phoneNumber)}
                                numericvalue
                                keyboardType={'numeric'}
                                onChangeText={this.handleInputPhoneNumber}
                            />
                            <Button
                                style={styles.input}
                                onPress={this.handleSubmitAuthCode}
                                size='large'
                                disabled={isSendAuthCodeRequest}>
                                인증문자 전송
                            </Button>

                            {
                                isSendAuthCodeRequest ?
                                    <React.Fragment>

                                        <Layout style={styles.authInfo}>
                                            <Text>
                                                {minutes}:{seconds < 10 ? `0${seconds}` : seconds} 남았지만, 우리사이에 무슨 인증이에요~
                                            </Text>
                                            <Text>
                                                그냥 <Text style={styles.authCode}>12345</Text> 입력해주세요 :)
                                            </Text>
                                        </Layout>

                                        <Input
                                            style={styles.input}
                                            textStyle={styles.inputText}
                                            size='large'
                                            placeholder='인증코드 입력'
                                            numericvalue
                                            keyboardType={'numeric'}
                                            value={String(inputAuthCode)}
                                            onChangeText={this.handleAuthCodeInput}
                                        />

                                        <Layout style={styles.policyContainer}>
                                            <TouchableOpacity>
                                                <Text style={styles.policy}>이용약관</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.policy}>개인정보취급방침</Text>
                                            </TouchableOpacity>
                                        </Layout>

                                        <Button
                                            size='large'
                                            onPress={this.handleStartNOWNOWButton}>
                                            동의하고 시작하기
                                        </Button>

                                    </React.Fragment>
                                    : null
                            }

                        </Layout>

                    </ScrollView>
                </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({

    safeAreaContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        padding: 15
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        marginVertical: 4
    },
    inputText: {
        textAlign: 'center'
    },
    authInfo: {
        alignItems: 'center',
        marginVertical: 15
    },
    authCode: {
        fontWeight: 'bold',
        color: 'blue'
    },
    errorContainer: {
        alignItems: 'center'
    },
    errorMessage: {
        color: 'red',
    },
    policyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15
    },
    policy: {
        marginHorizontal: 10
    }

});

export default inject('authStore')(observer(AuthScreen));
