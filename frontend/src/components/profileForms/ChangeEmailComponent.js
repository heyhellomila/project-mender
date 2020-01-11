import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangeEmailComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={{flex: 4, width: '75%', paddingTop: 2}}>
                <View style={{flex: 0.5}}>
                    <Text>New Email</Text>
                    <TextInput style={props.validEmail && props.emailNotAlreadyUsed
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               onChangeText={text => props.handleNewEmail(text)}/>
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Re-Enter new e-mail</Text>
                    <TextInput style={props.validEmailMatch
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               onChangeText={text => props.handleConfirmEmail(text)}/>
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Password</Text>
                    <TextInput style={props.validAuth
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               onChangeText={text => props.handleCurrentPassword(text)}/>
                </View>
                <View style={{flex: 0.5}}>
                    {!props.validEmailMatch &&
                    <Text style={{color: 'red'}}>Emails must match.</Text>
                    }
                    {!props.validEmail &&
                    <Text style={{color: 'red'}}>Please enter a valid email</Text>
                    }
                    {!props.validAuth &&
                    <Text style={{color: 'red'}}>Please enter correct password</Text>
                    }
                    {!props.emailNotAlreadyUsed &&
                    <Text style={{color: 'red'}}>Email Already in Use</Text>
                    }
                </View>
                <View style={buttonStyles.bottomButtonsRow}>
                    <View>
                        <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                    </View>
                    <View><Button
                        disabled={props.disableUpdateButton}
                        title={'Confirm'}
                        onPress={() => props.handleEmailChange()}/></View>
                </View>
            </View>
        </View>
    );
}

export default ChangeEmailComponent;