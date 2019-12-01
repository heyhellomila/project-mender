import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

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
                <View style={{flex: 5.5}}>
                    <Text style={styles.instructions}>Blah</Text>
                </View>
                <View>
                    <Button title={'Back'} onPress={() => props.goToProfilePage()}/>
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default ChangePasswordForm;