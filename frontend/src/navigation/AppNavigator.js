import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import DrawerNavigator from './DrawerNavigator';

const RootStack = createStackNavigator({
    LogInPage: {
        screen: LogInPage,
    },
    SignUpPage: {
        screen: SignUpPage
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
