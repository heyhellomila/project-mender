import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createAppContainer
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import JobListPage from './pages/JobListPage';
import ShoppingListPage from './pages/ShoppingListPage';
import EmailPage from './pages/EmailPage';
import { Image } from 'react-native';
import React from 'react';

const bottomNavigator = createBottomTabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={require('../assets/homeIcon.png')}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
    JobListPage: {
        screen: JobListPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={require('../assets/jobListIcon.png')}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
    OpenWorkModal:{
        screen: () => null,
        navigationOptions: () =>({
            tabBarLabel: "",
            tabBarOnPress: () => alert('WORK MODAL'),
            tabBarIcon: ({ tintColor }) => (<Image
                source={require('../assets/addWorkIcon.png')}
                style={{ width: 40, height: 40, tintColor: 'black' }}
            />),
        })
    },
    ShoppingListPage: {
        screen: ShoppingListPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={require('../assets/shoppingListIcon.png')}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
    EmailPage: {
        screen: EmailPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={require('../assets/emailIcon.png')}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
})

const RootStack = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    SignUpPage: {
        screen: SignUpPage
    },
    LogInPage: {
        screen: LogInPage,
    },
    BottomNavigator: {
        screen: bottomNavigator
    }
}, {
    headerMode: 'none'
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;