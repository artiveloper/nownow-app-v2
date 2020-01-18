import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Layout, Text} from "@ui-kitten/components";

const FollowingListItem = ({item}) => {

    return (
        <Layout style={styles.container}>
            <Avatar
                shape='rounded'
                style={styles.avatar}
                source={{uri: 'https://via.placeholder.com/45/92c952'}}
            />
            <Layout style={styles.userInfoContainer}>
                <Text category='s1'>{item.followName}</Text>
                <Text appearance='hint'>{item.phoneNumber}</Text>
            </Layout>
            <Layout style={styles.currentPostContainer}>
                <Text category='c1'>등록된 글 : {item.postCnt}</Text>
            </Layout>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    userInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 15
    },
    currentPostContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
});

export default FollowingListItem;
