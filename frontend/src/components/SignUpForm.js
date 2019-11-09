import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const SignUpForm = (props) => {
    var errorMsg = <Text>Invalid username or password.</Text>
    return (
        <View>
            {props.error 
                ? errorMsg
                : null
            }
            <Text>First Name</Text>
            <TextInput 
            style={{height: 40, width:150}}
            placeholder="Your first name"
            defaultValue={props.first_name}
            onChangeText={text => props.handleFirstNameChange(text)}
            />
            <Text>Last Name</Text>
            <TextInput 
            style={{height: 40, width:150}}
            placeholder="Your last name"
            defaultValue={props.last_name}
            onChangeText={text => props.handleLastNameChange(text)}
            />
            <Text>
                Email
            </Text>
            <TextInput
                style={{height: 40, width: 150}}
                placeholder="abc@gmail.com"
                defaultValue={props.email}
                onChangeText={text => props.handleEmailChange(text)}
            />
            <Text>
                Password
            </Text>
            <TextInput
                style={{height: 40, width: 150}}
                placeholder="password"
                defaultValue={props.password}
                onChangeText={text => props.handlePasswordChange(text)}
            />
            <Text>
                Type
            </Text>
            <TextInput
                style={{height: 40, width: 150}}
                placeholder="type"
                defaultValue={props.type}
                onChangeText={text => props.handleTypeChange(text)}
            />
            <Button
                title="Sign up"
                onPress={() => props.handleSignUp()}
            />
        </View>
    );
};

export default SignUpForm;