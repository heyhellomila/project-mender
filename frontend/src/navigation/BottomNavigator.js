import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomePage from '../pages/HomePage';
import JobListPage from '../pages/JobListPage';
import ShoppingListPage from '../pages/ShoppingListPage';
import EmailPage from '../pages/EmailPage';
import { Image } from 'react-native';
import React from 'react';

const homeIcon = require('../../assets/homeIcon.png');
const jobListIcon = require('../../assets/jobListIcon.png');
const addWorkIcon = require('../../assets/addWorkIcon.png');
const shoppingListIcon = require('../../assets/shoppingListIcon.png');
const emailIcon = require('../../assets/emailIcon.png');

const BottomNavigator = createBottomTabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={homeIcon}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
    JobListPage: {
        screen: JobListPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={jobListIcon}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
    OpenWorkModal: {
        screen: () => null,
        navigationOptions: ({ navigation }) => ({
            title: '',
            tabBarOnPress: () => navigation.navigate('Modal') ,
            tabBarIcon: ({ tintColor }) => (<Image
                source={addWorkIcon}
                style={{ width: 60, height: 60, tintColor: 'black' }}
            />),
        })
    },
    ShoppingListPage: {
        screen: ShoppingListPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={shoppingListIcon}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
    EmailPage: {
        screen: EmailPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Image
                source={emailIcon}
                style={{ width: 24, height: 24, tintColor: 'black' }}
            />),
        }
    },
}, {
    tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'black',
        style: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5
        }
    }
})

export default BottomNavigator;
