import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Image, View, Text } from 'react-native';
import React from 'react';
import BottomNavigator from './BottomNavigator';
import CreateWorkOrderPage from '../pages/CreateWorkOrderPage';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';
import AboutUsPage from '../pages/AboutUsPage';
import ProfilePage from '../pages/ProfilePage';
import HeaderAddress from '../components/HeaderAddress';
import HeaderButton from '../components/HeaderButton';
import { styles } from '../stylesheets/Stylesheet';


const menderLogo = require('../../assets/mender_logo_no_text.jpg')

//Navigator for top header
const BottomStackNavigatorRoot = createStackNavigator({
    BottomNavigator: BottomNavigator,
    SettingsPage: SettingsPage,
    HelpPage: HelpPage,
    AboutUsPage: AboutUsPage,
    ProfilePage: ProfilePage
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerLeft: (
                <Image style={styles.imageTopBarLogo} source={menderLogo} />
            ),
            headerTitle: (
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <HeaderAddress/>
                </View>
            ),
            headerRight: (
                <View style={{ marginRight: 10, width: 50, height: 50 }}>
                    <HeaderButton navigation={navigation}/>
                </View>
            )
        }
    }
})

//navigator at root level for Work Order Modal
const RootNavigator = createStackNavigator({
    MainApp: {
        screen: BottomStackNavigatorRoot,
    },
    Modal: {
        screen: CreateWorkOrderPage,
    },
},{
    headerMode: 'none',
    mode: 'modal',
})
const BottomStackNavigator = createAppContainer(RootNavigator);

export default BottomStackNavigator;
