import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import {
    titleStyles,
    textInputStyles,
    buttonStyles,
    containerStyles,
    imageStyles
} from '../../stylesheets/ProfilePageStylesheet';

const profilePicture = require('../../../assets/profileMender.png');

const EditProfileForm = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={titleStyles.title}><Text>Edit Pofile</Text></View>
            <View style={imageStyles.imageView}>
                <Image
                    style={imageStyles.profileImage}
                    source={profilePicture}/>
                <TouchableOpacity><Text style={{alignSelf: 'center'}}>Change Profile Picture</Text></TouchableOpacity>
            </View>
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
                <View style={{flex: 0.6}}>
                    <Text>Email</Text>
                    <TextInput style={props.validEmail
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               defaultValue={props.user.email}
                               onChangeText={text => props.handleEmailChange(text)}/>
                </View>
                <View style={{flex: 0.6}}>
                    <Text>Phone Number</Text>
                    <TextInput style={props.validPhoneNumber
                        ? textInputStyles.textInput
                        : textInputStyles.invalidTextInput}
                               defaultValue={props.user.phoneNumber}
                               onChangeText={text => props.handlePhoneNumberChange(text)}/>
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

export default EditProfileForm;