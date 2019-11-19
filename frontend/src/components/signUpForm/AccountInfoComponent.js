import { formStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { View, Text, TextInput } from 'react-native';
import React from 'react';

const AccountInfoComponent = (props) => {
    return (
        <View style={{flex: 4}}>
            <View style={{flex: 1, paddingBottom: '3%'}}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Phone number</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validPhoneNumber 
                        ? formStyles.textInput 
                        : formStyles.invalidTextInput}
                        defaultValue = {props.phoneNumber}
                        keyboardType='phone-pad'
                        onChangeText = {(value) => props.handlePhoneNumber(value)}/>
                </View>
            </View>
            <View style={{flex: 1, paddingVertical: '3%'}}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Email</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validEmail 
                        ? formStyles.textInput 
                        : formStyles.invalidTextInput}
                        defaultValue = {props.email}
                        onChangeText = {(value) => props.handleEmail(value)}/>
                </View>
            </View>
            <View style={{flex: 1, paddingVertical: '3%'}}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Password</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validPassword && props.validPasswordMatch 
                        ? formStyles.textInput 
                        : formStyles.invalidTextInput}
                        defaultValue = {props.password}
                        secureTextEntry={true}
                        password={true}
                        onChangeText = {(value) => props.handlePassword(value)}/>
                </View>
            </View>
            <View style={{flex: 1, paddingVertical: '3%'}}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Confirm Password</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validPassword && props.validPasswordMatch 
                        ? formStyles.textInput 
                        : formStyles.invalidTextInput}
                        defaultValue = {props.confirmPassword}
                        secureTextEntry={true}
                        password={true}
                        onChangeText = {(value) => props.handleConfirmPassword(value)}/>
                </View>
            </View>
        </View>
    );
};

export default AccountInfoComponent;
