import React from 'react';
import { Text, View} from 'react-native';
import LoginForm  from '../components/LoginForm';
import { login } from '../apis/users/Login'
import { authenticate } from '../redux/actions'
import { connect } from 'react-redux';
import { loginComponent } from '../stylesheets/Stylesheet';

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitting: false,
      error: false,
      errorMsg: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
      await login(this.state.email, this.state.password).then(async (response) => {
        await this.props.authenticate(response.data.token).then(() => {
          if (!this.props.user.loading && this.props.user.user) {
            this.props.navigation.navigate('HomePage')
          }
        })
      });
    } catch (err) {
      this.setState({error: true, submitting: false, errorMsg: err.message})
    }
  }

  render() {
    var {submitting} = this.state;

    return (
      <View style={loginComponent.logInContainer}>
        {submitting 
          ? <Text>Loading...</Text>
          : <LoginForm {...this.state} handleEmailChange={this.handleEmailChange} 
            handlePasswordChange={this.handlePasswordChange} handleLogin={this.handleLogin}/>
        }
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: (token) => dispatch(authenticate(token))
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
