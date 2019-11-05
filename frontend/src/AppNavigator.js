import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createAppContainer
} from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import JobListPage from './pages/JobListPage';
import ShoppingListPage from './pages/ShoppingListPage';
import EmailPage from './pages/EmailPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import AboutUsPage from './pages/AboutUsPage';
import { Image, View, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

const BottomNavigator = createBottomTabNavigator({
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
    OpenWorkModal: {
        screen: () => null,
        navigationOptions: () => ({
            title:'',
            tabBarOnPress: () => alert('WORK MODAL'),
            tabBarIcon: ({ tintColor }) => (<Image
                source={require('../assets/addWorkIcon.png')}
                style={{ width: 60, height: 60, tintColor: 'black' }}
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

const BottomStackNavigator = createStackNavigator({
    BottomNavigator: BottomNavigator
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerLeft: (
                <Image style={{ marginLeft: 10, width: 50, height: 50 }} source={require('../assets/menderlogo.png')} />
            ),
            headerTitle: (
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <Text>4035 Jamal's Address</Text>
                </View>
            ),
            headerRight: (
                <View style={{ marginRight: 10, width: 50, height: 50 }}>
                    <Button title="S" onPress={() => navigation.openDrawer()}></Button>
                </View>
            )
        }
    }
})

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1, paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0 }}>
        <View style={{ flex: 2, height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/menderlogo.png')} style={{ height: 120, width: 120 }} />
        </View>
        <View style={{ flex: 3 }}>
            <Text>PROPERTIES</Text>
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
        <View style={{ flex: 1 }}>
            <View style={{alignSelf:'flex-end', width:'50%'}}>
                <Button title='LOG OUT'></Button>
            </View>
        </View>
    </SafeAreaView>
)
const DrawerNavigator = createDrawerNavigator({
    BottomStackNavigator: {
        screen: BottomStackNavigator,
        navigationOptions: {
            title: 'Home'
        }
    },
    SettingsPage: {
        screen: SettingsPage,
        navigationOptions: {
            title: 'Settings'
        }
    },
    HelpPage: {
        screen: HelpPage,
        navigationOptions: {
            title: 'Help'
        }
    },
    AboutUsPage: {
        screen: AboutUsPage,
        navigationOptions: {
            title: 'About Us'
        }
    }
}, {
    drawerPosition: "right",
    contentComponent: CustomDrawerComponent
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
    DrawerNavigator: {
        screen: DrawerNavigator
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions: {	
        gesturesEnabled: false,	
    },
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;