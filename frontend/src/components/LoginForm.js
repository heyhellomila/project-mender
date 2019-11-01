import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const LoginForm = (props) => {
    return (
        <View>
            <Text>Username</Text>
            <TextInput
            style={{height: 40, width: 50}}
            placeholder="abc@gmail.com"
            onChangeText={text => props.handleEmailChange(text)}
            />
            <Text>Password</Text>
            <TextInput
            style={{height: 40, width: 50}}
            placeholder="password"
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
