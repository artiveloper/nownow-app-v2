import React from "react";
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Button, ButtonGroup, Divider, Layout, Text} from "@ui-kitten/components";
import {CONTAINER_SIZE} from "../constants/Layouts";
import {inject, observer} from "mobx-react";
import Reactotron from 'reactotron-react-native';

const RequestingOrderListItem = ({item, orderStore, userStore}) => {

    const handleOkRequest = ({message}) => {
        //await orderStore.okRequesting({item});
        Reactotron.log(message)
    };

    return (
        <Layout style={{paddingHorizontal: CONTAINER_SIZE}}>
            <TouchableHighlight onPress={() => alert("상세보기는 다음에...")}>
                <Layout style={styles.container}>
                    {
                        item.postImagePaths.length > 0 ?
                            <Layout style={styles.imageContainer}>
                                <Image
                                    style={styles.thumbnail}
                                    source={{uri: item.thumbnail}}/>
                                <Button style={styles.statusBadge} size='tiny'>거래중</Button>
                            </Layout> : null
                    }
                    <Layout style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                        <Text
                            category='p1'>{item.postTitle.length > 35 ? `${item.postTitle.substring(0, 33)}...` : item.postTitle}</Text>

                        <Layout style={{flex: 1, flexDirection: 'row'}}>
                            {
                                item.computedOrderType === '판매'
                                    ? <Text category='s1' status='primary'>{item.computedOrderType}</Text>
                                    : <Text category='s1' status='danger'>{item.computedOrderType}</Text>
                            }
                            <Text category='s1' style={styles.price}>{item.computedPrice}</Text>
                        </Layout>

                        <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text category='p2'>{item.sellerName}</Text>
                            <Text category='p2' appearance='hint' style={styles.createdDate}>{item.computedDate}</Text>
                        </Layout>
                    </Layout>
                </Layout>
            </TouchableHighlight>

            <Layout style={{paddingBottom: 10}}>
                {
                    userStore.userId === String(item.sellerId)
                        ? <Button onPress={() => handleOkRequest('hi')} style={{width: '100%'}}>거래 수락</Button>
                        : <Button onPress={() => alert('취소는 안돼요!ㅎㅎ')} style={{width: '100%'}}>요청 취소</Button>
                }
            </Layout>

            <Divider/>
        </Layout>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        //paddingHorizontal: CONTAINER_SIZE,
        paddingVertical: 10
    },
    imageContainer: {
        position: 'relative',
        width: 80,
    },
    thumbnail: {
        height: 80,
        width: 80,
        borderRadius: 7
    },
    statusBadge: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    price: {
        marginLeft: 7
    },
    createdDate: {
        marginLeft: 7
    },
    separator: {
        borderBottomColor: '#e9ecef',
        borderBottomWidth: 1
    }
});


export default inject('orderStore', 'userStore')(observer(RequestingOrderListItem));
