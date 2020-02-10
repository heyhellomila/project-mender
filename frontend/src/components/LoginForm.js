import React from 'react';
import {Text, TextInput, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {logInPageStyles} from '../stylesheets/LogInPageStylesheet';

const menderLogo = require('../../assets/mender_logo.jpg');

const LoginForm = (props) => {
    return (
        <View style={logInPageStyles.logInForm}>
            <View style={{borderColor: 'red', borderWidth: 2, height: Dimensions.get('screen').height * 0.4, padding: '3%'}}>
                <Image style={logInPageStyles.imageLogIn}
                       source={menderLogo}/>
            </View>
            <View style={{
                borderColor: 'purple',
                borderWidth: 2,
                alignItems: 'center',
                height: Dimensions.get('screen').height * 0.2
            }}>
                <View style={{flex:1,borderColor: 'green', borderWidth: 2, height: Dimensions.get('screen').height * 0.05, justifyContent:'center'}}>
                    <TextInput
                        style={logInPageStyles.textInput}
                        placeholder="Email"
                        defaultValue={props.email}
                        onChangeText={text => props.handleEmailChange(text)}
                    />
                </View>
                <View style={{flex:1,borderColor: 'green', borderWidth: 2, height: Dimensions.get('screen').height * 0.05, justifyContent: 'center'}}>
                    <TextInput
                        style={logInPageStyles.textInput}
                        placeholder="Password"
                        defaultValue={props.password}
                        secureTextEntry={true}
                        password={true}
                        onChangeText={text => props.handlePasswordChange(text)}
                    />
                </View>
            </View>
            <View style={{borderColor: 'orange', borderWidth: 2, justifyContent: 'center'}}>
                <View style={logInPageStyles.invalidInputView}>
                    {props.error
                        ? <Text style={logInPageStyles.invalidInput}>{props.errorMsg}</Text>
                        : null
                    }
                </View>
                <View style={logInPageStyles.logInSignUpSection}>
                    <TouchableOpacity style={logInPageStyles.buttonLogIn}
                                      onPress={() => props.handleLoginValidation()}>
                        <Text style={logInPageStyles.buttonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <View style={logInPageStyles.signUpSection}>
                        <Text style={logInPageStyles.buttonText}>Don't have an account?</Text>
                        <TouchableOpacity style={logInPageStyles.buttonSignUp}
                                          onPress={() => props.navigation.navigate('SignUpPage')}>
                            <Text style={logInPageStyles.buttonSignUp}> Sign Up.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LoginForm;
