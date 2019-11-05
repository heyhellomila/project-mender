import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';
import AboutUsPage from '../pages/AboutUsPage';
import { Image } from 'react-native';
import React from 'react';
import DrawerComponent from '../components/DrawerComponent'
import BottomStackNavigator from './BottomStackNavigator';

const homeIcon = require('../../assets/homeIcon.png');
const settingsIcon = require("../../assets/settingsIcon.png");
const helpIcon = require("../../assets/helpIcon.png");
const aboutUsIcon = require("../../assets/aboutUsIcon.png");

const DrawerNavigatorStack = createDrawerNavigator({
    BottomStackNavigator: {
        screen: BottomStackNavigator,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={homeIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, tintColor: tintColor }} />
            )
        }
    },
    SettingsPage: {
        screen: SettingsPage,
        navigationOptions: {
            title: 'Settings',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={settingsIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, tintColor: tintColor }} />
            )
        }
    },
    HelpPage: {
        screen: HelpPage,
        navigationOptions: {
            title: 'Help',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={helpIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, tintColor: tintColor }} />
            )
        }
    },
    AboutUsPage: {
        screen: AboutUsPage,
        navigationOptions: {
            title: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={aboutUsIcon}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, tintColor: tintColor }} />
            )
        }
    }
}, {
    drawerPosition: "right",
    contentComponent: DrawerComponent
})

const DrawerNavigator = createAppContainer(DrawerNavigatorStack);
export default DrawerNavigator;