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
            />
            <Text>Last Name</Text>
            <TextInput 
            style={{height: 40, width:150}}
            placeholder="Your last name"
            />
            <Text>
                Email
            </Text>
            <TextInput
                style={{height: 40, width: 150}}
                placeholder="abc@gmail.com"
            />
            <Text>
                Password
            </Text>
            <TextInput
                style={{height: 40, width: 150}}
                placeholder="password"
            />
            <Button
                title="Sign up"
            />
        </View>
    );
};

export default SignUpForm;