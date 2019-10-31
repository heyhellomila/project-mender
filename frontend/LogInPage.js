import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class LogInPage extends React.Component {
  static navigationOptions = {
    title: 'Log In',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Log In Here</Text>
        <View style={styles.buttonLogIn}>
          <Button
            title="Go To Home"
            onPress={() =>
              this.props.navigation.navigate('HomePage')
            }
          />
        </View>
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