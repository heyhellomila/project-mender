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
            style={{flex: 1, width: '100%', justifyContent:'center'}}
            source={menderBackground}>
        {submitting 
          ? <Text style={{alignSelf:'center', backgroundColor: 'white', padding: '2%'}}>Loading...</Text>
          : <LoginForm {...this.state} handleEmailChange={this.handleEmailChange} 
            handlePasswordChange={this.handlePasswordChange} handleLogin={this.handleLogin}/>
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
