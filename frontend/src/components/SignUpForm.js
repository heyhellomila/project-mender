import React from 'react';
import { Text, TextInput, View, Button, Picker } from 'react-native';
import { signUpComponent } from '../stylesheets/Stylesheet';

const SignUpForm = (props) => {
    return (
        <View>
            {props.error
                ? <Text>{props.errorMsg}</Text>
                : null
            }
            <Text>First Name</Text>
            <TextInput
                style={signUpComponent.signUpInputText}
                placeholder="Your first name"
                defaultValue={props.first_name}
                onChangeText={text => props.handleFirstNameChange(text)}
            />
            <Text>Last Name</Text>
            <TextInput
                style={signUpComponent.signUpInputText}
                placeholder="Your last name"
                defaultValue={props.last_name}
                onChangeText={text => props.handleLastNameChange(text)}
            />
            <Text>
                Email
            </Text>
            <TextInput
                style={signUpComponent.signUpInputText}
                placeholder="abc@gmail.com"
                defaultValue={props.email}
                onChangeText={text => props.handleEmailChange(text)}
            />
            <Text>
                Password
            </Text>
            <TextInput
                style={signUpComponent.signUpInputText}
                placeholder="password"
                defaultValue={props.password}
                onChangeText={text => props.handlePasswordChange(text)}
            />
            <Text>
                Type
            </Text>
            <Picker selectedValue = {props.type} onValueChange = {value => props.handleTypeChange(value)}>
               <Picker.Item label = "Homeowner" value = "HOMEOWNER" />
               <Picker.Item label = "Contractor" value = "CONTRACTOR" />
               <Picker.Item label = "Inspector" value = "INSPECTOR" />
            </Picker>
            <Button
                title="Sign up"
                onPress={() => props.handleSignUp()}
            />
        </View>
    );
};

export default SignUpForm;