import React from 'react';
import { Text, View } from 'react-native';
import SignUpForm  from '../components/signUpForm/SignUpForm';
import { register } from '../apis/users/Register';
import validator from 'validator';
import passwordValidator from '../utils/PasswordUtils';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1,
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      type: '',
      phoneNumber: '',
      submitting: false,
      errorMsg: '',
      validEmail: true,
      validPassword: true,
      validFirstName: true,
      validLastName: true,
      validPasswordMatch: true,
      validPhoneNumber: true,
      validFormInputs: true,
    };
  }

  componentDidUpdate() {
    if (this.state.validFormInputs === true && this.state.submitting === true) {
      this.registerUser();
    }
    else if (this.state.validFormInputs === false && this.state.submitting === true) {
      this.setState({ submitting: false });
      if (this.state.errorMsg.length > 0) {
        alert(this.state.errorMsg);
      }
    }
  }

  nextStep = () => {
    const { step } = this.state;
    
    if (step === 1) {
      if (this.validateName() === true) {
        this.setState({
          step: step + 1
        });
      }
    }
    if (step === 2) {
      if (this.state.type === 'HOMEOWNER') {
        this.setState({
          step: step + 2
        });
      } else {
        this.setState({
          step: step + 1
        });
      }
    }
    if (step === 3) {
      this.setState({
        step: step + 1
      });
    }
  };

  prevStep = () => {
    const { step, type} = this.state;

    if (step === 1) {
      this.props.navigation.goBack();
    }
    if (step === 2) {
      this.setState({
        step: step - 1
      });
    }

    if (step === 3) {
      this.setState({
        step: step - 1
      });
    }

    if (step === 4) {
      if (type === 'HOMEOWNER') {
        this.setState({
          step: step - 2
        });
      } else {
        this.setState({
          step: step - 1
        });
      }
    }
  };

  validateName() {
    const { firstName, lastName } = this.state;
    this.setState({
      validFirstName: firstName.length !== 0,
      validLastName: lastName.length !== 0
    });
    return (firstName.length !== 0 && lastName.length !== 0);
  }

  handleEmail = (event) => {
    this.setState({email: event});
  };

  handlePassword = (event) => {
    this.setState({password: event});
  };

  handleConfirmPassword = (event) => {
    this.setState({confirmPassword: event});
  };

  handleFirstName = (event) => {
    this.setState({firstName: event});
  };

  handleLastName = (event) => {
    this.setState({lastName: event});
  };

  handleType = (event) => {
    this.setState({type: event}, () => this.nextStep());
  };

  handlePhoneNumber = (event) => {
    this.setState({phoneNumber: event});
  };

  validateFields = () => { 
    const { password, confirmPassword, email, phoneNumber } = this.state;
    if (password !== confirmPassword) {
      this.setState({validFormInputs: false, validPasswordMatch: false, 
        errorMsg: 'Passwords entered do not match.'});
    }
    if (!passwordValidator.validate(password)) {
      this.setState({validFormInputs: false, validPassword: false, 
        errorMsg: 'Password must be at least 8 characters, and must include at least one ' +
          'number and at least one letter.'});
    }
    if (!validator.isEmail(email)) {
      this.setState({ validFormInputs: false, validEmail: false, 
        errorMsg: 'Invalid email address.'});
    }
    if (!this.validatePhoneNumber(phoneNumber)) {
      this.setState({ validFormInputs: false, validPhoneNumber: false,
        errorMsg: 'Invalid phone number.'});
    }
  };

  validatePhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/\D/g,'');
    return phoneNumber.length === 10;
  };

  registerUser = async() => {
    try {
      await register(this.state.email, this.state.password, this.state.firstName, 
        this.state.lastName, this.state.type, this.state.phoneNumber).then(() => {
          this.props.navigation.navigate('LogInPage');
      });
    } catch (err) {
      this.setState({errorMsg: err.message});
      alert(this.state.errorMsg);
    } finally {
      this.setState({submitting: false});
    }
  };

  handleRegister = async() => {
    this.setState({ submitting: true, validFormInputs: true, errorMsg: '', 
      validEmail: true, validPassword: true, validPasswordMatch: true, 
      validPhoneNumber: true });

    this.validateFields();
  };

  render() {
    return (
      <SignUpForm {...this.state} 
        nextStep={this.nextStep} 
        prevStep={this.prevStep} 
        handleEmail={this.handleEmail} 
        handlePassword={this.handlePassword} 
        handleConfirmPassword={this.handleConfirmPassword} 
        handleFirstName={this.handleFirstName} 
        handleLastName={this.handleLastName} 
        handleType={this.handleType} 
        handlePhoneNumber={this.handlePhoneNumber} 
        submit={this.handleRegister}
      />
    );
  }
}
