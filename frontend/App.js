import React from 'react';
import AppNavigator from './src/pages/AppNavigator';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './src/redux/reducers'

const store = createStore(rootReducer, applyMiddleware( thunkMiddleware ));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <AppNavigator/>
      </Provider>
    );
  }
}