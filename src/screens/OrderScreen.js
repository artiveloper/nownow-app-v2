import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {inject, observer} from "mobx-react";
import {Button, Divider, Layout, Spinner, Text} from "@ui-kitten/components";
import {BackIcon, MinusIcon, PlusIcon} from "../components/Icons";
import {CONTAINER_SIZE} from "../constants/Layouts";
import Reactotron from 'reactotron-react-native';

class OrderScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '거래 요청 확인',
            headerLeft: () => (
                <TouchableOpacity
                    style={{marginLeft: CONTAINER_SIZE}}
                    onPress={() => navigation.goBack(null)}>
                    <BackIcon/>
                </TouchableOpacity>
            ),
        }
    };

    async componentDidMount() {
        const {postStore, orderStore} = this.props;
        let willOrderPost = postStore.post;
        await orderStore.setOrder(willOrderPost);
    }

    handleSubmitOrder = async () => {
        const {navigation, orderStore} = this.props;
        await orderStore.requestOrder();
        navigation.popToTop();
        /*navigation.dispatch(resetHomeStackAction());
        navigation.dispatch(goTransactionScreenAfterOrderRequest(REQUESTING));*/
    };

    render() {
        const {loading, order} = this.props.orderStore;
        return (
            loading
                ? <Spinner/>
                :

                <Layout style={{flex: 1}}>
                    <ScrollView>
                        <Layout style={styles.container}>


                            <Layout style={styles.rowContainer}>
                                <Text appearance='hint' category='s1'>거래요청대상</Text>
                                <Text category='s1'>{order.writerName}</Text>
                            </Layout>

                            <Divider/>

                            <Layout style={styles.rowContainer}>
                                <Text appearance='hint' category='s1'>게시물 제목</Text>
                                <Text category='s1'>{order.title}</Text>
                            </Layout>

                            <Divider/>

                            <Layout style={styles.rowContainer}>
                                <Text appearance='hint' category='s1'>거래타입</Text>
                                <Text category='s1'>{order.computedPostType}</Text>
                            </Layout>

                            <Divider/>

                            <Layout style={styles.rowContainer}>
                                <Text appearance='hint' category='s1'>거래요청대상</Text>
                                <Text category='s1'>{order.writerName}</Text>
                            </Layout>

                            <View style={styles.content}>

                                {
                                    order.computedPostType === '대여' ?
                                        <Layout style={styles.rowContainer}>
                                            <Text appearance='hint' category='s1'>대여일</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <TouchableOpacity onPress={order.decreaseRentDate}>
                                                    <MinusIcon/>
                                                </TouchableOpacity>
                                                <Text style={{paddingHorizontal: 10}}>{order.rentDate}</Text>
                                                <TouchableOpacity onPress={order.increaseRentDate}>
                                                    <PlusIcon/>
                                                </TouchableOpacity>
                                            </View>
                                        </Layout>
                                        : null
                                }
                            </View>

                            <Divider/>

                            <Layout style={styles.rowContainer}>
                                <Text appearance='hint' category='s1'>금액</Text>
                                <Text category='s1'>{order.computedPrice}</Text>
                            </Layout>

                            <Divider/>

                            <Layout style={styles.rowContainer}>
                                <Text appearance='hint' category='s1'>총 금액</Text>
                                <Text category='s1'>{order.totalPrice}</Text>
                            </Layout>


                            <Divider/>

                        </Layout>
                    </ScrollView>

                    <Layout>
                        <Button
                            onPress={this.handleSubmitOrder}
                            style={{paddingBottom: 30}}>거래요청하기</Button>
                    </Layout>

                </Layout>
        );
    }

}

export default inject("postStore", "orderStore")(observer(OrderScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: CONTAINER_SIZE
    },

    rowContainer: {
        flex: 1,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});
