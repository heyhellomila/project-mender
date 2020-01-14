import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import {
    titleStyles,
    textInputStyles,
    buttonStyles,
    containerStyles,
    changeProfileComponentStyles
} from '../../stylesheets/ProfilePageStylesheet';

const ChangeNameComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.changeComponentContainer}>
                <View style={changeProfileComponentStyles.changeProfileInsideComponent}>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>First Name</Text>
                            <TextInput style={props.validFirstName
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       defaultValue={props.user.firstName}
                                       onChangeText={text => props.handleFirstNameChange(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentRows}>
                        <View style={changeProfileComponentStyles.changeProfileInputComponent}>
                            <Text style={changeProfileComponentStyles.changeProfileTextAlignSelf}>Last Name</Text>
                            <TextInput style={props.validLastName
                                ? textInputStyles.textInput
                                : textInputStyles.invalidTextInput}
                                       defaultValue={props.user.lastName}
                                       onChangeText={text => props.handleLastNameChange(text)}/>
                        </View>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                        <View style={changeProfileComponentStyles.changeProfileConfirmButton}>
                            <TouchableOpacity
                                style={props.disableUpdateButton ? buttonStyles.buttonConfirmDisabled : buttonStyles.buttonConfirm}
                                disabled={props.disableUpdateButton}
                                onPress={() => props.handleUpdate()}><Text>Confirm</Text></TouchableOpacity>
                        </View>
                        <View style={changeProfileComponentStyles.changeProfileBackButton}>
                            <TouchableOpacity onPress={() => props.goToProfilePage()}><Text
                                style={changeProfileComponentStyles.changeProfileUnderLineText}>Back</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex: 2}}>
            </View>
        </View>
    );
}

export default ChangeNameComponent;