import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createAppContainer
} from 'react-navigation';
import WelcomePage from './WelcomePage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import LogInPage from './LogInPage';

const RootStack = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    SignUpPage: { screen: SignUpPage },
    HomePage: { screen: HomePage },
    LogInPage: {screen: LogInPage},
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;