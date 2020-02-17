import React from 'react';
import { Text, View, ImageBackground, ActivityIndicator} from 'react-native';
import LoginForm  from '../components/LoginForm';
import { login } from '../apis/users/Login'
import { authenticate } from '../redux/actions'
import { connect } from 'react-redux';
import { loginComponent } from '../stylesheets/Stylesheet';
import validator from 'validator';
import Spinner from 'react-native-loading-spinner-overlay';

const menderBackground = require('../../assets/mender_background.png');

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitting: false,
      error: false,
      errorMsg: '',
      emptyEmail: false,
      invalidEmail: false,
      invalidEmailErrorMsg: 'Invalid e-mail address.',
      emptyEmailErrorMsg: 'Enter your e-mail address.',
      emptyPassword: false,
      emptyPasswordErrorMsg: 'Enter your password.',
      navigation: this.props.navigation
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

  handleLoginValidation = () => {
    const {email, password} = this.state;
    this.setState({invalidEmail: false, emptyEmail: false, emptyPassword: false, error: false});
    this.setState({
          emptyEmail: email === '',
          emptyPassword: password === '',
          invalidEmail: email !== '' && !validator.isEmail(email)
        },
        () => {
          if (!this.state.emptyEmail && !this.state.emptyPassword && !this.state.invalidEmail) {
            this.setState({submitting: true});
            this.handleLogin();
          }
        })
  }
  handleLogin = async() => {
    this.setState({ submitting: true })
    try {
      await login(this.state.email, this.state.password).then(async (response) => {
        await this.props.authenticate(response.data.token).then(() => {
          if (!this.props.user.loading && this.props.user.user) {
            this.props.navigation.navigate('HomePage')
            this.setState({submitting: false, email: '', password: '', error: false})
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
        <ImageBackground
            style={loginComponent.imageBackgroundLogin}
            source={menderBackground}>
        {submitting
          ? <Spinner
                visible={submitting}
            />
          : <LoginForm {...this.state} handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange} handleLoginValidation={this.handleLoginValidation}/>
        }
        </ImageBackground>
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
