import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomePage from '../pages/WelcomePage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import WorkOrderPage from '../pages/WorkOrderPage'
import DrawerNavigator from './DrawerNavigator';

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
    },
    WorkOrderPage: {
        screen: WorkOrderPage
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;
