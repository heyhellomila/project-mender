import React from 'react';
import { Text, TextInput, View, TouchableOpacity, Picker } from 'react-native';
import { signUpComponent } from '../stylesheets/Stylesheet';

const SignUpForm = (props) => {
    return (
        <View>
            <Text style={signUpComponent.fieldDescriptor}>
                First Name
            </Text>
            <TextInput
                style={(props.validFirstName 
                    ? signUpComponent.signUpInputText : signUpComponent.invalidSignUpInputText)}
                placeholder="Your first name"
                defaultValue={props.firstName}
                onChangeText={(text) => props.handleFirstNameChange(text)}
            />
            <Text style={signUpComponent.fieldDescriptor}>
                Last Name
            </Text>
            <TextInput
                style={(props.validLastName 
                    ? signUpComponent.signUpInputText : signUpComponent.invalidSignUpInputText)}
                placeholder="Your last name"
                defaultValue={props.lastName}
                onChangeText={(text) => props.handleLastNameChange(text)}
            />
            <Text style={signUpComponent.fieldDescriptor}>
                Email
            </Text>
            <TextInput
                style={(props.validEmail 
                    ? signUpComponent.signUpInputText : signUpComponent.invalidSignUpInputText)}
                placeholder="abc@gmail.com"
                defaultValue={props.email}
                onChangeText={(text) => props.handleEmailChange(text)}
            />
            <Text style={signUpComponent.fieldDescriptor}>
                Password
            </Text>
            <TextInput
                style={(props.validPassword && props.validPasswordMatch
                    ? signUpComponent.signUpInputText : signUpComponent.invalidSignUpInputText)}
                placeholder="password"
                defaultValue={props.password}
                secureTextEntry={true}
                password={true}
                onChangeText={(text) => props.handlePasswordChange(text)}
            />
            <Text style={signUpComponent.fieldDescriptor}>
                Confirm password
            </Text>
            <TextInput
                style={(props.validPassword && props.validPasswordMatch
                    ? signUpComponent.signUpInputText : signUpComponent.invalidSignUpInputText)}
                placeholder="password"
                defaultValue={props.confirmPassword}
                secureTextEntry={true}
                password={true}
                onChangeText={(text) => props.handleConfirmPasswordChange(text)}
            />
            <Text style={signUpComponent.fieldDescriptor}>
                Type
            </Text>
            <Picker style={signUpComponent.picker} itemStyle={signUpComponent.pickerItem} 
                selectedValue = {props.type} onValueChange = {(value) => props.handleTypeChange(value)}>
               <Picker.Item label = "Homeowner" value = "HOMEOWNER" />
               <Picker.Item label = "Contractor" value = "CONTRACTOR" />
               <Picker.Item label = "Inspector" value = "INSPECTOR" />
            </Picker>
            <TouchableOpacity
                style={signUpComponent.registerButton}
                onPress={() => props.handleRegister()}
                underlayColor='#fff'>
                <Text style={signUpComponent.registerText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpForm;