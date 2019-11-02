import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const LoginForm = (props) => {
    var errorMsg = <Text>Invalid username or password.</Text>
    return (
        <View>
            {props.error 
                ? errorMsg
                : null
            }
            <Text>
                Username
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
                secureTextEntry={true}
                password={true}
                onChangeText={text => props.handlePasswordChange(text)}
            />
            <Button
                title="Login"
                onPress={() => props.handleLogin()}
            />
        </View>
    );
};

export default LoginForm;
