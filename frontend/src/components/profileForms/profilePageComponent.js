import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Image, Button } from 'react-native';
import { titleStyles, buttonStyles, imageStyles, containerStyles } from '../../stylesheets/ProfilePageStylesheet';

const profilePicture = require('../../../assets/profileMender.png');

const ProfilePageComponent = (props) => {
        return (
            <View style={containerStyles.container}>
                <View style={titleStyles.title}><Text>Account Pofile</Text></View>
                <View style={imageStyles.imageView}>
                    <Image
                        style={imageStyles.profileImage}
                        source={profilePicture}/></View>
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
                    <View style={{flex: 3, width: '75%'}}>
                        <Button title={'Edit Profile'} onPress={() => props.goToEditProfilePage()}/>
                    </View>
                    <View style={{flex: 3, width: '75%'}}>
                        <Button title={'Change Password'}onPress={() => props.goToPasswordChange()}/></View>
                </View>
                <View style={{flex: 3}}>

                </View>
            </View>
        );
}

export default ProfilePageComponent;