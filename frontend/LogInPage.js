import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LogInPage extends React.Component {
  static navigationOptions = {
    title: 'Log In',
  };
  render() {
    return (
      <View style={styles.container}>
          <Text>Log In Here</Text>
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