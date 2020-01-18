import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from "@ui-kitten/components";
import AuthCheckScreen from "../screens/AuthCheckScreen";
import AuthScreen from "../screens/AuthScreen";
import {createStackNavigator} from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TransactionScreen from "../screens/TransactionScreen";
import MyInfoScreen from "../screens/MyInfoScreen";
import { enableScreens } from 'react-native-screens';
import AddPostScreen from "../repository/AddPostScreen";

enableScreens();

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

export const HomeStack = createStackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen
        },
        AddPostScreen: {
            screen: AddPostScreen
        }
    }
);

export const FollowingStack = createStackNavigator(
    {
        FollowingScreen: {
            screen: FollowingScreen
        }
    }
);

export const TransactionStack = createStackNavigator(
    {
        TransactionScreen: {
            screen: TransactionScreen
        }
    }
);

export const MyInfoStack = createStackNavigator(
    {
        MyInfoScreen: {
            screen: MyInfoScreen
        }
    }
);


const TabNavigator = createBottomTabNavigator({
        '홈': {
            screen: HomeStack,
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
            screen: FollowingStack,
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
            screen: TransactionStack,
            navigationOptions: {
                tabBarIcon: ({focused}) =>
                    <BottomTabBarIcon
                        name="swap"
                        focused={focused}
                    />
            }
        },
        '내정보': {
            screen: MyInfoStack,
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

const switchNavigation = createSwitchNavigator(
    {
        TabNavigator: TabNavigator,
        AuthCheckScreen: AuthCheckScreen,
        AuthScreen: AuthScreen
    },
    {
        initialRouteName: 'AuthCheckScreen'
    }
);

export const AppNavigator = createAppContainer(switchNavigation);
