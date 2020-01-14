import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles, changeProfileComponentStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangeEmailComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.changeComponentContainer}>
                <View style={changeProfileComponentStyles.changeProfileInsideComponent}>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Current Email: {props.user.email}</Text>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>New Email</Text>
                            <TextInput style={props.validEmail && props.emailNotAlreadyUsed
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       onChangeText={text => props.handleNewEmail(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Re-Enter new e-mail</Text>
                            <TextInput style={props.validEmailMatch
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       onChangeText={text => props.handleConfirmEmail(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Password</Text>
                            <TextInput style={props.validAuth
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       onChangeText={text => props.handleCurrentPassword(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        {!props.validEmailMatch &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Emails must match.</Text>
                        }
                        {!props.validEmail &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Please enter a valid email</Text>
                        }
                        {!props.validAuth &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Please enter correct password</Text>
                        }
                        {!props.emailNotAlreadyUsed &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Email Already in Use</Text>
                        }
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileConfirmButton}>
                            <TouchableOpacity style={props.disableUpdateButton ? buttonStyles.buttonConfirmDisabled : buttonStyles.buttonConfirm}
                                              disabled={props.disableUpdateButton}
                                              onPress={() => props.handleEmailChange()}><Text>Confirm</Text></TouchableOpacity>
                        </View>
                        <View style={changeProfileComponentStyles.changeProfileBackButton}>
                            <TouchableOpacity onPress={() => props.goToProfilePage()}><Text style={{textDecorationLine:'underline'}}>Back</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex: 1}}>
            </View>
        </View>
    );
}

export default ChangeEmailComponent;