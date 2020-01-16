import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import {textInputStyles, buttonStyles, containerStyles, changeProfileComponentStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangePhoneNumberComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.changeComponentContainer}>
                <View style={changeProfileComponentStyles.changeProfileInsideComponent}>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Current Phone Number: {props.user.phoneNumber}</Text>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Phone Number</Text>
                            <TextInput style={props.validPhoneNumber && props.phoneNumberNotAlreadyUsed && !props.emptyField
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       onChangeText={text => props.handlePhoneNumber(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                        {!props.validPhoneNumber &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Invalid phone number.</Text>
                        }
                        {!props.phoneNumberNotAlreadyUsed &&
                            <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Phone numer already in use.</Text>
                        }
                        {props.emptyField &&
                            <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Field can't be empty.</Text>
                        }
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                        <View style={changeProfileComponentStyles.changeProfileConfirmButton}>
                            <TouchableOpacity style={props.disableUpdateButton ? buttonStyles.buttonConfirmDisabled : buttonStyles.buttonConfirm}
                                              disabled={props.disableUpdateButton}
                                              onPress={() => props.handlePhoneNumberChange()}><Text>Confirm</Text></TouchableOpacity>
                        </View>
                        <View style={changeProfileComponentStyles.changeProfileBackButton}>
                            <TouchableOpacity
                                disabled={props.disableBackButton}
                                onPress={() => props.goToProfilePage()}>
                                <Text style={changeProfileComponentStyles.changeProfileButtonText}>BACK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={changeProfileComponentStyles.changeProfileBottomNormalRow}>
            </View>
        </View>
    );
}

export default ChangePhoneNumberComponent;