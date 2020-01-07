import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {
    titleStyles,
    textInputStyles,
    buttonStyles,
    containerStyles,
} from '../../stylesheets/ProfilePageStylesheet';

const ChangeNameComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={{flex: 5, width: '50%'}}>
                <View style={{flex: 0.6}}>
                    <Text>First Name</Text>
                    <TextInput style={props.validFirstName
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               defaultValue={props.user.firstName}
                               onChangeText={text => props.handleFirstNameChange(text)}/>
                </View>
                <View style={{flex: 0.6}}>
                    <Text>Last Name</Text>
                    <TextInput style={props.validLastName
                            ? textInputStyles.textInput
                            : textInputStyles.invalidTextInput}
                                      defaultValue={props.user.lastName}
                                      onChangeText={text => props.handleLastNameChange(text)}/>
                </View>
               
                <View style={buttonStyles.bottomButtonsRow}>
                    <View>
                        <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                    </View>
                    <View><Button
                        disabled={props.disableUpdateButton}
                        title={'Update'}
                        onPress={() => props.handleUpdate()}/></View>
                </View>
            </View>
        </View>
    );
}

export default ChangeNameComponent;