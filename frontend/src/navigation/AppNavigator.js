import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomePage from '../pages/WelcomePage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import DrawerNavigator from './DrawerNavigator';
import  BottomNavigator from './BottomNavigator'

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
