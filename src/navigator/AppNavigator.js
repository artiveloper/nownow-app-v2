import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from "../screens/HomeScreen";
import FriendScreen from "../screens/FriendScreen";
import TransactionScreen from "../screens/TransactionScreen";
import MyInfoScreen from "../screens/MyInfoScreen";
import {Icon} from "@ui-kitten/components";

export const BottomTabBarIcon = ({name, focused, tintColor}) => {
    return (
        <Icon
            name={name}
            width={24}
            height={24}
            fill={focused ? tintColor : 'gray'}
        />
    )
};

const TabNavigator = createBottomTabNavigator({
        '홈': {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({focused, inactiveTintColor}) =>
                    <BottomTabBarIcon
                        name="home"
                        focused={focused}
                        inactiveTintColor={inactiveTintColor}
                    />
            }
        },
        '친구': {
            screen: FriendScreen,
            navigationOptions: {
                tabBarIcon: ({focused, inactiveTintColor}) =>
                    <BottomTabBarIcon
                        name="people"
                        focused={focused}
                        inactiveTintColor={inactiveTintColor}
                    />
            }
        },
        '거래': {
            screen: TransactionScreen,
            navigationOptions: {
                tabBarIcon: ({focused}) =>
                    <BottomTabBarIcon
                        name="swap"
                        focused={focused}
                    />
            }
        },
        '내정보': {
            screen: MyInfoScreen,
            navigationOptions: {
                tabBarIcon: ({focused}) =>
                    <BottomTabBarIcon
                        name="settings"
                        focused={focused}
                    />
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: 'black',
        },
        initialRouteName: '홈'
    }
);

export const AppNavigator = createAppContainer(TabNavigator);
