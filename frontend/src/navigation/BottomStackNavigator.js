import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import React from 'react';
import BottomNavigator from './BottomNavigator';
import CreateWorkOrderPage from '../pages/CreateWorkOrderPage';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';
import AboutUsPage from '../pages/AboutUsPage';
import ProfilePage from '../pages/ProfilePage';
import HeaderAddress from '../components/HeaderAddress';
import HeaderButton from '../components/HeaderButton';
import { styles, headerStyles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';


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
            headerStyle: {
                height: 130,
                paddingBottom: 10
            },
            headerLeft: (
                <Image style={styles.imageTopBarLogo} source={menderLogo} />
            ),
            headerTitle: (
                <View style={headerStyles.commonHeaderTitle}>
                    <HeaderAddress/>
                    <CommonHeader/>
                </View>
            ),
            headerRight: (
                <View style={headerStyles.profileButton}>
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
