import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import {buttonStyles, containerStyles, imageStyles, profilePageStyles} from '../../stylesheets/ProfilePageStylesheet';

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
            <View style={containerStyles.profilePageContainer}>
                <View style={profilePageStyles.profilePageRows}>
                    <View style={profilePageStyles.profilePageInsideRows}>
                        <View style={profilePageStyles.profilePageJustifyContentStart}>
                            <Text>Name: {props.user.firstName} {props.user.lastName}</Text>
                        </View>
                        <View style={profilePageStyles.profilePageJustifyContentEnd}>
                            <TouchableOpacity
                                onPress={() => props.goToChangeNamePage()}><Text style={profilePageStyles.profilePageUnderlineText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={profilePageStyles.profilePageRows}>
                    <View style={profilePageStyles.profilePageInsideRows}>
                        <View style={profilePageStyles.profilePageJustifyContentStart}>
                            <Text>Email: {props.user.email}</Text>
                        </View>
                        <View style={profilePageStyles.profilePageJustifyContentEnd}>
                            <TouchableOpacity
                                onPress={() => props.goToUpdateEmailPage()}><Text style={profilePageStyles.profilePageUnderlineText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={profilePageStyles.profilePageRows}>
                    <View style={profilePageStyles.profilePageInsideRows}>
                        <View style={profilePageStyles.profilePageJustifyContentStart}>
                            <Text>Phone Number: {props.user.phoneNumber}</Text>
                        </View>
                        <View style={profilePageStyles.profilePageJustifyContentEnd}>
                            <TouchableOpacity
                                onPress={() => props.goToUpdatePhoneNumberPage()}><Text style={profilePageStyles.profilePageUnderlineText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={profilePageStyles.profilePageRows}>
                    <View style={profilePageStyles.profilePageInsideRows}>
                        <View style={profilePageStyles.profilePageJustifyContentStart}>
                            <Text>Password: ********</Text>
                        </View>
                        <View style={profilePageStyles.profilePageJustifyContentEnd}>
                            <TouchableOpacity
                                onPress={() => props.goToChangePasswordPage()}><Text style={profilePageStyles.profilePageUnderlineText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={profilePageStyles.profilePageBackHome}>
                <View style={profilePageStyles.profilePageJustifyContentEnd}>
                    <TouchableOpacity
                        onPress={() => props.goToHomePage()}><Text style={profilePageStyles.profilePageUnderlineText}>Back To Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ProfilePageComponent;