import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';

const profilePicture = require('../../../assets/jisooProfile.png');

const EditProfileForm = (props) => {
    return (
        <View style={styles.container}>
            <View style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '75%',
                borderBottomColor: 'black',
                borderBottomWidth: 1
            }}><Text>Edit Pofile</Text></View>
            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: 75, height: 75, borderRadius: 75 / 2}}
                    source={profilePicture}/>
                <TouchableOpacity><Text style={{alignSelf: 'center'}}>Change Profile Picture</Text></TouchableOpacity>
            </View>
            <View style={{flex: 4.5, width: '50%'}}>
                <View style={{flex: 0.5}}>
                    <Text>First Name</Text>
                    <TextInput style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1}}
                               defaultValue={props.user.firstName}
                               onChangeText={text => props.handleFirstNameChange(text)}/>
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Last Name</Text>
                    <TextInput style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1}}
                               defaultValue={props.user.lastName}
                               onChangeText={text => props.handleLastNameChange(text)}/>
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Email</Text>
                    <TextInput style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1}}
                               defaultValue={props.user.email}
                               onChangeText={text => props.handleEmailChange(text)}/>
                </View>
                <View style={{flex: 0.5}}>
                    <Text>Phone Number</Text>
                    <TextInput style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1}}
                               defaultValue={props.user.phoneNumber}
                               onChangeText={text => props.handlePhoneNumberChange(text)}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                    </View>
                    <View><Button title={'Update'} onPress={() => props.handleUpdate()}/></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderColor: 'black',
        borderWidth: 2
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default EditProfileForm;