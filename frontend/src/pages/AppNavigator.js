import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createAppContainer
} from 'react-navigation';
import createBottomTabNavigator from 'react-navigation-tabs';
import WelcomePage from './src/pages/WelcomePage';
import SignUpPage from './src/pages/SignUpPage';
import HomePage from './src/pages/HomePage';
import LogInPage from './src/pages/LogInPage';
import JobListPage from './src/pages/JobListPage';
import ShoppingListPage from './src/pages/ShoppingListPage';
import EmailPage from './src/pages/EmailPage';

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

