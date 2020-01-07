import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import { buttonStyles, containerStyles, imageStyles } from '../../stylesheets/ProfilePageStylesheet';
const profilePicture = require('../../../assets/profileMender.png');

const ProfilePageComponent = (props) => {
        return (
            <View style={containerStyles.container}>
                <View style={imageStyles.imageView}>
                    <Image
                        style={imageStyles.profileImage}
                        source={profilePicture}/>
                    {/*<TouchableOpacity><Text style={{alignSelf: 'center'}}>Change Profile Picture</Text></TouchableOpacity>*/}
                </View>
                <View style={{flex: 2.5, width: '50%'}}>
                    <View style={{flex: 2}}>
                        <View>
                            <Text>First Name: {props.user.firstName}</Text>
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <View>
                            <Text>Last Name: {props.user.lastName}</Text>
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <View>
                            <Text>Email: {props.user.email}</Text>
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <View>
                            <Text>Phone Number: {props.user.phoneNumber}</Text>
                        </View>
                    </View>
                </View>
                <View style={buttonStyles.bottomButtonsColumn}>
                    <View style={{flex: 2, width: '75%'}}>
                        <Button title={'Edit Name'} onPress={() => props.goToChangeNamePage()}/>
                    </View>
                    <View style={{flex: 2, width: '75%'}}>
                        <Button title={'Update Email'} onPress={() => props.goToUpdateEmailPage()}/>
                    </View>
                    <View style={{flex: 2, width: '75%'}}>
                        <Button title={'Update Phone Number'} onPress={() => props.goToUpdatePhoneNumberPage()}/>
                    </View>
                    <View style={{flex: 2, width: '75%'}}>
                        <Button title={'Change Password'}onPress={() => props.goToChangePasswordPage()}/></View>
                </View>
            </View>
        );
}

export default ProfilePageComponent;