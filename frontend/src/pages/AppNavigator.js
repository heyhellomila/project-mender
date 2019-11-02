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
        screen: WelcomePage,
        navigationOptions: ({ navigation }) => ({header: null})
    },
    SignUpPage: { screen: SignUpPage,
        navigationOptions: ({ navigation }) => ({header: null}) },
    HomePage: { screen: HomePage,
        navigationOptions: ({ navigation }) => ({header: null}) },
    LogInPage: {screen: LogInPage,
        navigationOptions: ({ navigation }) => ({header: null})},
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;