import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangePhoneNumberComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={{flex: 3, width: '50%'}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <Text>Phone Number</Text>
                        <TextInput style={props.validPhoneNumber
                            ? textInputStyles.textInput
                            : textInputStyles.invalidTextInput}
                                   onChangeText={text => props.handlePhoneNumberChange(text)}/>
                    </View>
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
                <View style={{flex: 0.5}}></View>
            </View>
        </View>
    );
}

export default ChangePhoneNumberComponent;