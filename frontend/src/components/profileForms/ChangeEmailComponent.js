import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {titleStyles, textInputStyles, buttonStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ChangeEmailComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={{flex: 3, width: '50%'}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 0.6}}>
                        <Text>Email</Text>
                        <TextInput style={props.validEmail
                            ? textInputStyles.textInput
                            : textInputStyles.invalidTextInput}
                                   onChangeText={text => props.handleEmailChange(text)}/>
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

export default ChangeEmailComponent;