import React from 'react';
import { Text, View } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import { register } from '../apis/users/Register'
import { registerComponent } from '../stylesheets/Stylesheet';
import validator from 'validator';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
      type: '',
      submitting: false,
      error: false,
      errorMsg: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.handleRegister = this.handleRegister.bind(this);
  }
  static navigationOptions = {
    title: 'Sign Up',
  };

  handleEmailChange = event => {
    this.setState({ email: event })
  }

  handlePasswordChange = event => {
    this.setState({ password: event })
  }

  handleConfirmPasswordChange = event => {
    this.setState({ confirm_password: event })
  }

  handleFirstNameChange = event => {
    this.setState({ first_name: event })
  }

  handleLastNameChange = event => {
    this.setState({ last_name: event })
  }

  handleTypeChange = event => {
    this.setState({ type: event })
  }

  validateEmail = (email) => {
    var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(email);
  };
  validatePassword = (password) => {
    var validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return validPassword.test(password);
  };


  handleRegister = async () => {
    this.setState({ submitting: true })
    alert(validator.isEmail(this.state.email))
    // if (!this.validateEmail(this.state.email)) {
    //   alert('Please Enter a Valid Email')
    // }
    // if (!this.validatePassword(this.state.password)) {
    //   alert('Password must be at least 8 characters and must include at least one digit.')
    // }
    // if (this.state.password != this.state.confirm_password) {
    //   alert('Passwords Must Match')
    // }
    try {
      await register(this.state.email, this.state.password, this.state.first_name, this.state.last_name, this.state.type).then(async (response) => {
        this.props.navigation.navigate('LogInPage')
      });
    } catch (err) {
      this.setState({ error: true, submitting: false, errorMsg: err.message })
    }
  }

  render() {
    var { submitting } = this.state;
    return (
      <View style={registerComponent.registerPageComponent}>
        <View style={{ width: '50%' }}>
          <Text style={{ alignSelf: 'center' }}>Sign Up Here</Text>
          {submitting
            ? <Text>Loading...</Text>
            : <RegisterForm  {...this.state}
              handleEmailChange={this.handleEmailChange}
              handlePasswordChange={this.handlePasswordChange} handleConfirmPasswordChange={this.handleConfirmPasswordChange}
              handleFirstNameChange={this.handleFirstNameChange} handleLastNameChange={this.handleLastNameChange}
              handleTypeChange={this.handleTypeChange} handleRegister={this.handleRegister} />
          }
        </View>
      </View>
    );
  }
}
