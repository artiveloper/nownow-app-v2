import React from "react";
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Button, Divider, Layout, Text} from "@ui-kitten/components";
import {CONTAINER_SIZE} from "../constants/Layouts";

const PointHistoryListItem = ({item, navigation}) => {

    return (
        <Layout style={styles.container}>
            <Layout style={styles.rowContainer}>
                <Text appearance='hint' category='s1'>게시글 제목</Text>
                <Text category='s1'>{item.postTitle.length > 20 ? item.postTitle.substr(0, 17) + '...' : item.postTitle }</Text>
            </Layout>

            <Layout style={styles.rowContainer}>
                <Text appearance='hint' category='s1'>판매/대여자</Text>
                <Text category='s1'>{item.sellerName}</Text>
            </Layout>

            <Layout style={styles.rowContainer}>
                <Text appearance='hint' category='s1'>구매자</Text>
                <Text category='s1'>{item.consumerName}</Text>
            </Layout>

            <Layout style={styles.rowContainer}>
                <Text appearance='hint' category='s1'>거래 금액</Text>
                <Text category='s1'>{item.point}</Text>
            </Layout>

            <Layout style={styles.rowContainer}>
                <Text appearance='hint' category='s1'>거래일자</Text>
                <Text category='s1'>{item.computedDate}</Text>
            </Layout>

            <Divider/>
        </Layout>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: CONTAINER_SIZE
    },

    rowContainer: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

export default PointHistoryListItem;
