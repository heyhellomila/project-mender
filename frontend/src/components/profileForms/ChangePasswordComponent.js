import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangePasswordComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={{flex: 3, width: '50%'}}>
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

export default ChangePasswordComponent;