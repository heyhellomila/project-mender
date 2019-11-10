import React from 'react';
import { Text, View } from 'react-native';
import SignUpForm  from '../components/SignUpForm';
import { register } from '../apis/users/Register'
import { signUpComponent } from '../stylesheets/Stylesheet';
import validator from 'validator';
import passwordValidator from '../utils/PasswordUtils'

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      type: 'HOMEOWNER',
      submitting: false,
      errorMsg: '',
      validEmail: true,
      validPassword: true,
      validFirstName: true,
      validLastName: true,
      validPasswordMatch: true,
      validFormInputs: true
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidUpdate() {
    if (this.state.validFormInputs == true && this.state.submitting == true)
      this.registerUser();
    else if (this.state.validFormInputs == false && this.state.submitting == true) {
      this.setState({ submitting: false });
      if (this.state.errorMsg.length > 0) {
        alert(this.state.errorMsg);
      }
    }
  }
  
  static navigationOptions = {
    title: 'Sign Up',
  };

  handleEmailChange = event => {
    this.setState({email: event})
  }

  handlePasswordChange = event => {
    this.setState({password: event})
  }

  handleConfirmPasswordChange = event => {
    this.setState({confirmPassword: event})
  }

  handleFirstNameChange = event => {
    this.setState({firstName: event})
  }

  handleLastNameChange = event =>{
    this.setState({lastName: event})
  }

  handleTypeChange = event =>{
    this.setState({type: event})
  }

  validateFields = () => {
    if (!this.state.firstName) {
      this.setState({validFormInputs: false, validFirstName: false})
    }
    if (!this.state.lastName) {
      this.setState({validFormInputs: false, validLastName: false})
    }    
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({validFormInputs: false, validPasswordMatch: false, 
        errorMsg: 'Passwords entered do not match.'})
    }
    if (!passwordValidator.validate(this.state.password)) {
      this.setState({validFormInputs: false, validPassword: false, 
        errorMsg: 'Password must be at least 8 characters, and must include at least one ' +
          'number and at least one letter.'})
    }
    if (!validator.isEmail(this.state.email)) {
      this.setState({ validFormInputs: false, validEmail: false, 
        errorMsg: 'Invalid email address.'})
    }
  }

  registerUser = async() => {
    try {
      await register(this.state.email, this.state.password, this.state.firstName, 
        this.state.lastName, this.state.type).then(() => {
          this.props.navigation.navigate('LogInPage')
      });
    } catch (err) {
      this.setState({submitting: false, errorMsg: err.message})
      alert(this.state.errorMsg);
    }
  }

  handleRegister = async() => {
    this.setState({ submitting: true, validFormInputs: true, errorMsg: '', 
      validFirstName: true, validLastName: true, validEmail: true, 
      validPassword: true, validPasswordMatch: true })

    this.validateFields();
  }

  render() {
    var {submitting} = this.state;
    return (
      <View style={signUpComponent.signUpPageComponent}>
        <View style={{width: '50%'}}>
          <View style={signUpComponent.headerView}>
            <Text style={signUpComponent.header}>Sign Up</Text>
          </View>
          {submitting 
          ? <Text>Loading...</Text>
          : <SignUpForm  {...this.state} 
            handleEmailChange={this.handleEmailChange} 
            handlePasswordChange={this.handlePasswordChange} handleConfirmPasswordChange={this.handleConfirmPasswordChange} 
            handleFirstNameChange={this.handleFirstNameChange} handleLastNameChange={this.handleLastNameChange} 
            handleTypeChange={this.handleTypeChange} handleRegister={this.handleRegister}/>
        }
        </View>
      </View>
    );
  }
}
