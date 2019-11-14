import React from 'react';
import { Text, TextInput, View, Button, Picker } from 'react-native';
import { registerComponent } from '../stylesheets/Stylesheet';

const RegisterForm = (props) => {
    return (
        <View>
            {props.error
                ? <Text>{props.errorMsg}</Text>
                : null
            }
            <Text>First Name</Text>
            <TextInput
                style={registerComponent.registerInputText}
                placeholder="Your first name"
                defaultValue={props.first_name}
                onChangeText={text => props.handleFirstNameChange(text)}
            />
            <Text>Last Name</Text>
            <TextInput
                style={registerComponent.registerInputText}
                placeholder="Your last name"
                defaultValue={props.last_name}
                onChangeText={text => props.handleLastNameChange(text)}
            />
            <Text>
                Email
            </Text>
            <TextInput
                style={registerComponent.registerInputText}
                placeholder="abc@gmail.com"
                defaultValue={props.email}
                onChangeText={text => props.handleEmailChange(text)}
            />
            <Text>
                Password
            </Text>
            <TextInput
                style={registerComponent.registerInputText}
                placeholder="password"
                defaultValue={props.password}
                secureTextEntry={true}
                password={true}
                onChangeText={text => props.handlePasswordChange(text)}
            />
            <Text>
                Confirm Password
            </Text>
            <TextInput
                style={registerComponent.registerInputText}
                placeholder="confirm password"
                defaultValue={props.confirm_password}
                secureTextEntry={true}
                password={true}
                onChangeText={text => props.handleConfirmPasswordChange(text)}
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
                title="Sign Up"
                onPress={() => props.handleRegister()}
            />
        </View>
    );
};

export default RegisterForm;