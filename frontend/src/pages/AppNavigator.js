import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createAppContainer
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import WelcomePage from './WelcomePage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import LogInPage from './LogInPage';
import JobListPage from './JobListPage';
import ShoppingListPage from './ShoppingListPage';
import EmailPage from './EmailPage';

const RootStack = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    SignUpPage: {
        screen: SignUpPage
    },
    HomePage: {
        screen: HomePage
    },
    JobListPage:{
        screen: JobListPage
    },
    ShoppingListPage:{
        screen: ShoppingListPage
    },
    EmailPage:{
        screen: EmailPage
    },
    LogInPage: {
        screen: LogInPage,
    }
},{
    headerMode: 'none'
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;