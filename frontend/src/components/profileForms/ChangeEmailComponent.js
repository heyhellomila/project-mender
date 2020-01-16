import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import { textInputStyles, buttonStyles, containerStyles, changeProfileComponentStyles} from '../../stylesheets/ProfilePageStylesheet';

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
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Password</Text>
                            <TextInput style={props.validAuth && props.validConfirmPassword
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       secureTextEntry={true}
                                       onChangeText={text => props.handleCurrentPassword(text)}/>
                        </View>
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
                        {!props.validEmailMatch &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Emails must match.</Text>
                        }
                        {!props.validEmail &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Please enter a valid email</Text>
                        }
                        {!props.validAuth &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Incorrect password</Text>
                        }
                        {!props.validConfirmPassword &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Password can't be empty.</Text>
                        }
                        {!props.emailNotAlreadyUsed &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Email already in use</Text>
                        }
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}></View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileConfirmButton}>
                            <TouchableOpacity style={props.submitting ? buttonStyles.buttonConfirmDisabled : buttonStyles.buttonConfirm}
                                              disabled={props.submitting}
                                              onPress={() => props.handleEmailChange()}><Text>Confirm</Text></TouchableOpacity>
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

export default ChangeEmailComponent;