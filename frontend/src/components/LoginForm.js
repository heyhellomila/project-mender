import React from 'react';
import {Text, TextInput, View, TouchableOpacity, Image, Dimensions, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {logInPageStyles} from '../stylesheets/LogInPageStylesheet';
const menderLogo = require('../../assets/mender_logo.jpg');

const LoginForm = (props) => {
    return (
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={logInPageStyles.container}>
            <ScrollView style={{flex: 6}}>
        <View style={logInPageStyles.logInForm}>
            <View style={logInPageStyles.imageLogInView}>
                <Image style={logInPageStyles.imageLogIn}
                       source={menderLogo}/>
            </View>
            <View style={logInPageStyles.textInputView}>
                <View style={{flex:1}}>
                    <TextInput
                        style={props.invalidEmail ? logInPageStyles.textInvalidInput: logInPageStyles.textInput}
                        placeholder="Email"
                        defaultValue={props.email}
                        onChangeText={text => props.handleEmailChange(text)}
                    />
                </View>
                <View style={{flex:1}}>
                    <TextInput
                        style={props.emptyPassword ? logInPageStyles.textInvalidInput: logInPageStyles.textInput}
                        placeholder="Password"
                        defaultValue={props.password}
                        secureTextEntry={true}
                        password={true}
                        onChangeText={text => props.handlePasswordChange(text)}
                    />
                </View>
            </View>
            <View style={{aspectRatio: 7/3.05}}>
                <View style={logInPageStyles.invalidInputView}>
                    {props.error
                        && <Text style={logInPageStyles.invalidInput}>{props.errorMsg}</Text>
                    }
                    {props.invalidEmail
                        && <Text style={logInPageStyles.invalidInput}>{props.invalidEmailErrorMsg}</Text>
                    }
                    {props.emptyPassword
                        && <Text style={logInPageStyles.invalidInput}>{props.emptyPasswordErrorMsg}</Text>
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
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default LoginForm;
