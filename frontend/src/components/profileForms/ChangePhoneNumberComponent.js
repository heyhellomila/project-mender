import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles, changeProfileComponentStyles} from '../../stylesheets/ProfilePageStylesheet';

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
                            <TextInput style={props.validPhoneNumber
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       onChangeText={text => props.handlePhoneNumberChange(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                        <View style={changeProfileComponentStyles.changeProfileConfirmButton}>
                            <TouchableOpacity style={props.disableUpdateButton ? buttonStyles.buttonConfirmDisabled : buttonStyles.buttonConfirm}
                                              disabled={props.disableUpdateButton}
                                              onPress={() => props.handleUpdate()}><Text>Confirm</Text></TouchableOpacity>
                        </View>
                        <View style={changeProfileComponentStyles.changeProfileBackButton}>
                            <TouchableOpacity onPress={() => props.goToProfilePage()}><Text style={changeProfileComponentStyles.changeProfileUnderLineText}>Back</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex: 2}}>
            </View>
        </View>
    );
}

export default ChangePhoneNumberComponent;