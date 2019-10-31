import {
    createStackNavigator
  } from 'react-navigation-stack';
  import {
    createAppContainer
  } from 'react-navigation';
import Home from './Home';
import LogInPage from './LogInPage';

const RootStack = createStackNavigator({
  Home: {
    screen: Home
  },
  LogInPage: { screen: LogInPage},
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;