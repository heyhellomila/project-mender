import React from 'react';
import { Text, View, ImageBackground, ActivityIndicator} from 'react-native';
import LoginForm  from '../components/LoginForm';
import { login } from '../apis/users/Login'
import { authenticate } from '../redux/actions'
import { connect } from 'react-redux';
import { loginComponent } from '../stylesheets/Stylesheet';
import validator from 'validator';

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
      invalidEmail: false,
      invalidEmailErrorMsg: 'Enter your e-mail address.',
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

  handleLoginValidation = () =>{
    const {email, password} = this.state;
    this.setState({invalidEmail: false, emptyPassword: false, error: false})
    if(email == '' && password == ''){
      this.setState({submitting: false, invalidEmail: true, emptyPassword: true})
    }else if(email == '' ){
      this.setState({invalidEmail: true, submitting: false})
    }
    else if(password == ''){
      this.setState({emptyPassword: true, submitting: false})
    }
    else if (!validator.isEmail(email)) {
      this.setState({invalidEmail: true, submitting: false, errorMsg: 'Invalid e-mail address.'})
    } else{
      this.handleLogin();
    }
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
          ? <ActivityIndicator style={{marginTop: '40%'}} size="large" color="#0000ff" />
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
