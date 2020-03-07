import React from 'react';
import { Text, View, TextInput, TouchableOpacity} from 'react-native';
import {
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
                        {(!props.validFirstName || !props.validLastName) &&
                        <Text style={changeProfileComponentStyles.changeProfileInvalidText}>Field can't be empty.</Text>
                        }
                    </View>
                    <View style={changeProfileComponentStyles.changeProfileInsideComponentNormalRows}>
                        <View style={changeProfileComponentStyles.changeProfileConfirmButton}>
                            <TouchableOpacity
                                style={((props.submitting && props.validateNameFields()) || !props.validateNameFields()) ? buttonStyles.buttonConfirmDisabled : buttonStyles.buttonConfirm}
                                disabled={props.submitting || !props.validateNameFields()}
                                onPress={() => {props.handleUpdate()}}><Text>Confirm</Text></TouchableOpacity>
                        </View>
                        <View style={changeProfileComponentStyles.changeProfileBackButton}>
                            <TouchableOpacity
                                disabled={props.submitting}
                                onPress={() => props.goToProfilePage()}><Text
                                style={changeProfileComponentStyles.changeProfileButtonText}>BACK</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={changeProfileComponentStyles.changeProfileBottomNormalRow}>
            </View>
        </View>
    );
};

export default ChangeNameComponent;