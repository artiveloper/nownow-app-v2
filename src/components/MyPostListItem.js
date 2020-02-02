import React from "react";
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Button, Divider, Layout, Text} from "@ui-kitten/components";
import {CONTAINER_SIZE} from "../constants/Layouts";

const MyPostListItem = ({item, navigation}) => {

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

export default MyPostListItem;
