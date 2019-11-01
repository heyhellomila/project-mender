import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginForm } from '../components/LoginForm'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});