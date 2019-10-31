import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';

export default class Home extends React.Component {
     static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={styles.homeLogo}>
          <Image
     source={require('../frontend/assets/menderlogo.png')}/>
        <Button
          title="Log In"
          onPress={() =>
            this.props.navigation.navigate('LogInPage')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },homeLogo:{
    flex: 1,
    marginTop:100,
    alignSelf: 'center'
  }
});