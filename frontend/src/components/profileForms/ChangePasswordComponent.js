import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangePasswordComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={{flex: 3, width: '75%'}}>
                <View style={{flex: 1}}>
                    <Text>Current Password</Text>
                    <TextInput style={props.validAuth
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               onChangeText={text => props.handleCurrentPassword(text)}/>
                </View>
                <View style={{flex: 1}}>
                    <Text>New Password</Text>
                    <TextInput style={props.validPassword
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               placeholder={'New Password'}
                               secureTextEntry={true}
                               onChangeText={text => props.handleNewPasswordChange(text)}/>
                </View>
                <View style={{flex: 1}}>
                    <Text>Confirm Password</Text>
                    <TextInput style={props.validPasswordMatch
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               placeholder={'Confirm Password'}
                               secureTextEntry={true}
                               onChangeText={text => props.handleConfirmPasswordChange(text)}/>
                </View>
                <View style={{flex: 1}}>
                    {!props.validPasswordMatch &&
                    <Text style={{color: 'red'}}>Passwords must match.</Text>
                    }
                    {!props.validPassword &&
                    <Text style={{color: 'red'}}>Password must be at least 8 characters, and must include at least one number and at least one letter.</Text>
                    }
                    {!props.validAuth &&
                    <Text style={{color: 'red'}}>Please enter correct password</Text>
                    }
                </View>
                <View style={buttonStyles.bottomButtonsRow}>
                    <View>
                        <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                    </View>
                    <View><Button
                        disabled={props.disableUpdateButton}
                        title={'Confirm'}
                        onPress={() => props.handlePasswordChange()}/></View>
                </View>
                <View style={{flex: 0.5}}></View>
            </View>
        </View>
    );
}

export default ChangePasswordComponent;