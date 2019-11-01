import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import LoginForm  from '../components/LoginForm';
import { login, getUser } from '../utils/ApiUtils'
import { getDecodedToken } from '../utils/AuthUtil'

export default class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '',
      submitting: false,
      error: false};
  }
  static navigationOptions = {
    title: 'Log In',
  };

  handleEmailChange = event => {
    this.setState({email: event})
  }

  handlePasswordChange = event => {
    this.setState({password: event})
  }

  handleLogin = async() => {
    this.setState({ submitting: true })
    try {
      const {data: {token}} = await login(this.state.email, this.state.password);
      AsyncStorage.setItem('Authorization', JSON.stringify(token));
      this.props.navigation.navigate('HomePage')
    } catch (err) {
      this.setState({error: true, submitting: false})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginForm {...this.state} handleEmailChange={this.handleEmailChange.bind(this)} 
          handlePasswordChange={this.handlePasswordChange.bind(this)} handleLogin={this.handleLogin.bind(this)}/>
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