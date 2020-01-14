import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';
import AboutUsPage from '../pages/AboutUsPage';
import ProfilePage from '../pages/ProfilePage';
import HomePage from '../pages/HomePage';
import {Image} from 'react-native';
import React from 'react';
import DrawerComponent from '../components/drawer/DrawerComponent'
import BottomStackNavigator from './BottomStackNavigator';
import {createStackNavigator} from 'react-navigation-stack';
import AddPropertyPage from '../pages/PropertyPages/AddPropertyPage';
import {drawerComponent} from '../../src/stylesheets/DrawerStyleSheet';
import PropertyDetailsPage from '../pages/PropertyPages/PropertyDetailsPage';

const homeIcon = require('../../assets/homeIcon.png');
const profileMenderIcon = require("../../assets/profileMender.png")
const settingsIcon = require('../../assets/settingsIcon.png');
const helpIcon = require('../../assets/helpIcon.png');
const aboutUsIcon = require('../../assets/aboutUsIcon.png');

const DrawerNavigatorStack = createDrawerNavigator({
    BottomStackNavigator: {
        screen: BottomStackNavigator,
        navigationOptions: {
            title: 'Navigation'
        }
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={homeIcon}
                    resizeMode='contain'
                    style={drawerComponent.drawerIcons}/>
            )
        }
    },
    ProfilePage: {
        screen: ProfilePage,
        navigationOptions: {
            title: 'Profile',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={profileMenderIcon}
                    resizeMode='contain'
                    style={drawerComponent.drawerIcons}/>
            )
        }
    },
    SettingsPage: {
        screen: SettingsPage,
        navigationOptions: {
            title: 'Settings',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={settingsIcon}
                    resizeMode='contain'
                    style={drawerComponent.drawerIcons}/>
            )
        }
    },
    HelpPage: {
        screen: HelpPage,
        navigationOptions: {
            title: 'Help',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={helpIcon}
                    resizeMode='contain'
                    style={drawerComponent.drawerIcons}/>
            )
        }
    },
    AboutUsPage: {
        screen: AboutUsPage,
        navigationOptions: {
            title: 'About Us',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={aboutUsIcon}
                    resizeMode='contain'
                    style={drawerComponent.drawerIcons}/>
            )
        }
    }
}, {
    drawerPosition: "right",
    contentComponent: DrawerComponent
});

const RootNavigator = createStackNavigator({
    MainApp: {
        screen: DrawerNavigatorStack,
    },
    AddProperty: {
        screen: AddPropertyPage,
    },
    PropertyDetails: {
        screen: PropertyDetailsPage
    }
}, {
    headerMode: 'none',
    mode: 'modal',
});

const DrawerNavigator = createAppContainer(RootNavigator);
export default DrawerNavigator;
