import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';

const ChangePasswordForm = (props) => {
    return (
        <View style={styles.container}>
            <View style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '75%',
                borderBottomColor: 'black',
                borderBottomWidth: 1
            }}><Text>Change Password</Text></View>
            <View style={{flex: 0.5}}>
            </View>
            <View style={{flex: 3, width: '50%'}}>
                <View style={{flex: 1}}>
                    <Text>New Password</Text>
                    <TextInput style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1}}
                               placeholder={'New Password'}
                               onChangeText={text => props.handleNewPasswordChange(text)}/>
                </View>
                <View style={{flex: 1}}>
                    <Text>Confirm Password</Text>
                    <TextInput style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1}}
                               placeholder={'Confirm Password'}
                               onChangeText={text => props.handleConfirmPasswordChange(text)}/>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                    <Button title={'Confirm'} onPress={() => props.handlePasswordChange()}/>
                </View>
                <View style={{flex: 3}}></View>
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

export default ChangePasswordForm;