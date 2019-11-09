import React from 'react';
import { Text, View } from 'react-native';
import SignUpForm  from '../components/SignUpForm';
import { signUp } from '../apis/users/SignUp'
import { signUpComponent } from '../stylesheets/Stylesheet';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '',
      first_name: '',
      last_name: '',
      type: '',
      submitting: false,
      error: false,
      errorMsg: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.handleSignUp = this.handleSignUp.bind(this);
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

  handleFirstNameChange = event => {
    this.setState({first_name: event})
  }

  handleLastNameChange = event =>{
    this.setState({last_name: event})
  }

  handleTypeChange = event =>{
    this.setState({type: event})
  }

  handleSignUp = async() => {
    this.setState({ submitting: true })
    try {
      await signUp(this.state.email, this.state.password, this.state.first_name, this.state.last_name, this.state.type).then(async (response) => {
        this.props.navigation.navigate('LogInPage')
      });
    } catch (err) {
      this.setState({error: true, submitting: false, errorMsg: err.message})
    }
  }

  render() {
    var {submitting} = this.state;
    return (
      <View style={signUpComponent.signUpPageComponent}>
        <View style={{width: '50%'}}>
          <Text style={{alignSelf:'center'}}>Sign Up Here</Text>
          {submitting 
          ? <Text>Loading...</Text>
          : <SignUpForm  {...this.state} 
            handleEmailChange={this.handleEmailChange} 
            handlePasswordChange={this.handlePasswordChange} handleFirstNameChange={this.handleFirstNameChange}
            handleLastNameChange={this.handleLastNameChange} handleTypeChange={this.handleTypeChange}
            handleSignUp={this.handleSignUp}/>
        }
        </View>
      </View>
    );
  }
}
