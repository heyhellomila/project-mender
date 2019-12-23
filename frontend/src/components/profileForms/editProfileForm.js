import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import {
    titleStyles,
    textInputStyles,
    buttonStyles,
    containerStyles,
    imageStyles
} from '../../stylesheets/ProfilePageStylesheet';

const profilePicture = require('../../../assets/jisooProfile.png');

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
            <View style={{flex: 4.5, width: '50%'}}>
                <View style={{flex: 0.5}}>
                    <Text>First Name</Text>
                    {props.validFirstName
                        ? <TextInput style={textInputStyles.textInput}
                                     defaultValue={props.user.firstName}
                                     onChangeText={text => props.handleFirstNameChange(text)}/>
                        : <TextInput style={textInputStyles.invalidTextInput}
                                     defaultValue={props.user.firstName}
                                     onChangeText={text => props.handleFirstNameChange(text)}/>
                    }
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Last Name</Text>
                    {props.validLastName
                        ? < TextInput style={textInputStyles.textInput}
                                      defaultValue={props.user.lastName}
                                      onChangeText={text => props.handleLastNameChange(text)}/>
                        : < TextInput style={textInputStyles.invalidTextInput}
                                      defaultValue={props.user.lastName}
                                      onChangeText={text => props.handleLastNameChange(text)}/>
                    }
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Email</Text>
                    {props.validEmail
                        ? < TextInput style={textInputStyles.textInput}
                                      defaultValue={props.user.email}
                                      onChangeText={text => props.handleEmailChange(text)}/>
                        : < TextInput style={textInputStyles.invalidTextInput}
                                      defaultValue={props.user.email}
                                      onChangeText={text => props.handleEmailChange(text)}/>
                    }
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Phone Number</Text>
                    {props.validPhoneNumber
                        ? < TextInput style={textInputStyles.textInput}
                                      defaultValue={props.user.phoneNumber}
                                      onChangeText={text => props.handlePhoneNumberChange(text)}/>
                        : < TextInput style={textInputStyles.invalidTextInput}
                                      defaultValue={props.user.phoneNumber}
                                      onChangeText={text => props.handlePhoneNumberChange(text)}/>
                    }
                </View>
                <View style={buttonStyles.bottomButtonsRow}>
                    <View>
                        <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                    </View>
                    <View><Button disabled={!props.validFirstName || !props.validLastName || !props.validEmail || !props.validPhoneNumber}
                                  title={'Update'}
                                  onPress={() => props.handleUpdate()}/></View>
                </View>
            </View>
        </View>
    );
}

export default EditProfileForm;