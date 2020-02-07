import React from 'react';
import { Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { styles, buttons } from '../stylesheets/Stylesheet';
import { logInPageStyles } from '../stylesheets/LogInPageStylesheet';

const menderLogo = require('../../assets/profileMender.png');

const LoginForm = (props) => {
    return (
        <View style={logInPageStyles.logInForm}>
                <Image style={logInPageStyles.imageLogIn}
                       source={menderLogo} />
            <TextInput
                style={logInPageStyles.textInput}
                placeholder="Email"
                defaultValue={props.email}
                onChangeText={text => props.handleEmailChange(text)}
            />

            <TextInput
                style={logInPageStyles.textInput}
                placeholder="Password"
                defaultValue={props.password}
                secureTextEntry={true}
                password={true}
                onChangeText={text => props.handlePasswordChange(text)}
            />
            <View style={logInPageStyles.invalidInputView}>
            {props.error
                ? <Text style={logInPageStyles.invalidInput}>{props.errorMsg}</Text>
                : null
            }
            </View>
                    <TouchableOpacity style={logInPageStyles.buttonLogIn}
                                      onPress={() => props.handleLogin()}>
                        <Text style={logInPageStyles.buttonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={logInPageStyles.buttonBack}
                                      onPress={() => props.navigation.goBack()}>
                        <Text style={logInPageStyles.buttonText}>BACK</Text>
                    </TouchableOpacity>
        </View>
    );
};

export default LoginForm;
