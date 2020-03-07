import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import NavigatorService from './src/navigation/NavigatorService';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <AppNavigator
             ref={navigatorRef => {NavigatorService.setContainer(navigatorRef);}}
         />
      </Provider>
    );
  }
}
