import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Image, Button } from 'react-native';

const profilePicture = require('../../../assets/jisooProfile.png');

const ProfilePageComponent = (props) => {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '75%',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1
                }}><Text>Account Pofile</Text></View>
                <View style={{flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{width: 75, height: 75, borderRadius: 75/2}}
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
                <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default ProfilePageComponent;