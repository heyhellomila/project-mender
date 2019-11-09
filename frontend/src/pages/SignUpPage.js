import React from 'react';
import { Text, View } from 'react-native';
import SignUpForm  from '../components/SignUpForm';
import { styles } from '../stylesheets/Stylesheet';

export default class SignUpPage extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };
  render() {
    return (
      <View style={{flex:1, alignItems: 'center',
      justifyContent: 'center'}}>
          <Text>Sign Up Here</Text>
          <SignUpForm/>
      </View>
    );
  }
}
