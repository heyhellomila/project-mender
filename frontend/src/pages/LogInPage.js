import React from 'react';
import { Text, View, ImageBackground} from 'react-native';
import LoginForm  from '../components/LoginForm';
import { login } from '../apis/users/Login'
import { authenticate } from '../redux/actions'
import { connect } from 'react-redux';
import { loginComponent } from '../stylesheets/Stylesheet';

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
    if(email == '' || password == ''){
      this.setState({error: true, submitting: false, errorMsg: 'Email or Password can\'t be empty'})
    }else{
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
          ? <Text style={loginComponent.loadingStyle}>Loading...</Text>
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
