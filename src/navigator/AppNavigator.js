import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AuthCheckScreen from "../screens/AuthCheckScreen";
import AuthScreen from "../screens/AuthScreen";
import {createStackNavigator} from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import FollowingScreen from "../screens/FollowingScreen";
import TransactionScreen from "../screens/TransactionScreen";
import MyInfoScreen from "../screens/MyInfoScreen";
import {enableScreens} from 'react-native-screens';
import AddPostScreen from "../screens/AddPostScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import OrderScreen from "../screens/OrderScreen";
import {BottomTabBarIcon} from "../components/Icons";
import Reactotron from 'reactotron-react-native';

enableScreens();

const HomeStack = createStackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen
        },
        AddPostScreen: {
            screen: AddPostScreen
        },
        PostDetailScreen: {
            screen: PostDetailScreen
        },
        OrderScreen: {
            screen: OrderScreen
        }
    },
    {
        initialRouteName: 'HomeScreen',
        navigationOptions: ({navigation}) => {
            let tabBarVisible = true;
            if (navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible,
            };
        }
    }
);

const FollowingStack = createStackNavigator(
    {
        FollowingScreen: {
            screen: FollowingScreen
        }
    }
);

const TransactionStack = createStackNavigator(
    {
        TransactionScreen: {
            screen: TransactionScreen
        },
        PostDetailScreen: {
            screen: PostDetailScreen
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarVisible: navigation.state.routes[navigation.state.index].routeName === 'TransactionScreen'
        })
    }
);

const MyInfoStack = createStackNavigator(
    {
        MyInfoScreen,
        PostDetailScreen: {
            screen: PostDetailScreen
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarVisible: navigation.state.routes[navigation.state.index].routeName === 'MyInfoScreen'
        })
    }
);

const MainTabNavigator = createBottomTabNavigator({
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
        TabNavigator: MainTabNavigator,
        AuthCheckScreen: AuthCheckScreen,
        AuthScreen: AuthScreen
    },
    {
        initialRouteName: 'AuthCheckScreen'
    }
);

export const AppNavigator = createAppContainer(switchNavigation);
