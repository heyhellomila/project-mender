import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../stylesheets/Stylesheet';

export default class SignUpPage extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };
  render() {
    return (
      <View style={styles.container}>
          <Text>Sign Up Here</Text>
      </View>
    );
  }
}
