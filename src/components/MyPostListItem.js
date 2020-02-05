import React from "react";
import {Image, StyleSheet, TouchableHighlight} from 'react-native';
import {Button, Divider, Layout, Text} from "@ui-kitten/components";
import {withNavigation} from "react-navigation";
import {TRADING} from "../constants/Status";

const MyPostListItem = ({item, navigation}) => {

    const handleItemClick = (postId) => {
        navigation.navigate('PostDetailScreen', {
            postId: postId
        })
    };

    return (
        <Layout>
            <TouchableHighlight onPress={() => handleItemClick(item.postId)}>
                <Layout style={styles.container}>
                    {
                        item.imagePaths.length > 0 ?
                            <Layout style={styles.imageContainer}>
                                <Image
                                    style={styles.thumbnail}
                                    source={{uri: item.thumbnail}}/>
                                {
                                    item.status === TRADING
                                        ? <Button style={styles.statusBadge} size='tiny'>거래중</Button>
                                        : null
                                }

                            </Layout> : null
                    }
                    <Layout style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                        <Text
                            category='p1'>{item.title.length > 35 ? `${item.title.substring(0, 33)}...` : item.title}</Text>

                        <Layout style={{flex: 1, flexDirection: 'row'}}>
                            {
                                item.computedOrderType === '판매'
                                    ? <Text category='s1' status='primary'>{item.computedOrderType}</Text>
                                    : <Text category='s1' status='danger'>{item.computedOrderType}</Text>
                            }
                            <Text category='s1'>{item.computedPrice}</Text>
                        </Layout>

                        <Text category='p2' appearance='hint'>{item.computedDate}</Text>
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
    separator: {
        borderBottomColor: '#e9ecef',
        borderBottomWidth: 1
    }
});

export default withNavigation(MyPostListItem);
