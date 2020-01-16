import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import {textInputStyles, buttonStyles, containerStyles, changeProfileComponentStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangePasswordComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.changeComponentContainer}>
                <View style={changeProfileComponentStyles.changeProfileInsideComponent}>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Current Password</Text>
                            <TextInput style={props.validAuth && props.validConfirmPassword
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       secureTextEntry={true}
                                       onChangeText={text => props.handleCurrentPassword(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>New Password</Text>
                            <TextInput style={props.validPassword && props.passwordNotAlreadyUsed
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       secureTextEntry={true}
                                       onChangeText={text => props.handleNewPasswordChange(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Re-Enter New Password</Text>
                            <TextInput style={props.validPasswordMatch
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       secureTextEntry={true}
                                       onChangeText={text => props.handleConfirmPasswordChange(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                        {!props.validAuth &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Incorrect password.</Text>
                        }
                        {!props.validConfirmPassword &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Current password can't be empty.</Text>
                        }
                        {!props.validPasswordMatch &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Passwords must match.</Text>
                        }
                        {!props.validPassword &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Password must be at least 8 characters, and must include at least one number and at least one letter.</Text>
                        }
                        {!props.passwordNotAlreadyUsed &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Can't use same as previous password.</Text>
                        }
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}></View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                        <View style={changeProfileComponentStyles.changeProfileConfirmButton}>
                            <TouchableOpacity style={props.submitting ? buttonStyles.buttonConfirmDisabled : buttonStyles.buttonConfirm}
                                              disabled={props.submitting}
                                              onPress={() => props.handlePasswordChange()}><Text>Confirm</Text></TouchableOpacity>
                        </View>
                        <View style={changeProfileComponentStyles.changeProfileBackButton}>
                            <TouchableOpacity
                                disabled={props.submitting}
                                onPress={() => props.goToProfilePage()}><Text style={changeProfileComponentStyles.changeProfileButtonText}>BACK</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={changeProfileComponentStyles.changeProfileBottomNormalRow}>
            </View>
        </View>
    );
}

export default ChangePasswordComponent;