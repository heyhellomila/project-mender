import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangePasswordForm = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={titleStyles.title}><Text>Change Password</Text></View>
            <View style={{flex: 0.5}}>
            </View>
            <View style={{flex: 3, width: '50%'}}>
                <View style={{flex: 1}}>
                    <Text>New Password</Text>
                    {props.validPassword
                        ? <TextInput style={textInputStyles.textInput}
                                     placeholder={'New Password'}
                                     secureTextEntry={true}
                                     onChangeText={text => props.handleNewPasswordChange(text)}/>
                        : <TextInput style={textInputStyles.invalidTextInput}
                                     placeholder={'New Password'}
                                     secureTextEntry={true}
                                     onChangeText={text => props.handleNewPasswordChange(text)}/>}
                </View>
                <View style={{flex: 1}}>
                    <Text>Confirm Password</Text>
                    {props.validPasswordMatch
                        ? <TextInput style={textInputStyles.textInput}
                                     placeholder={'Confirm Password'}
                                     secureTextEntry={true}
                                     onChangeText={text => props.handleConfirmPasswordChange(text)}/>
                        : <TextInput style={textInputStyles.invalidTextInput}
                                     placeholder={'Confirm Password'}
                                     secureTextEntry={true}
                                     onChangeText={text => props.handleConfirmPasswordChange(text)}/>}
                </View>
                <View style={{flex: 1}}>
                    {!props.validPasswordMatch &&
                    <Text style={{color: 'red'}}>Passwords must match.</Text>
                    }
                    {!props.validPassword &&
                    <Text style={{color: 'red'}}>Password must be at least 8 characters, and must include at least one number and at least one letter.</Text>
                    }
                </View>
                <View style={buttonStyles.bottomButtonsRow}>
                    <View>
                        <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                    </View>
                    <View>
                        <Button title={'Confirm'} onPress={() => props.handlePasswordChange()}/>
                    </View>
                </View>
                <View style={{flex: 0.5}}></View>
            </View>
        </View>
    );
}

export default ChangePasswordForm;