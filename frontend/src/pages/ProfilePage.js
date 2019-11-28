import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput} from 'react-native';

const profilePicture = require('../../assets/jisooProfile.png');

export default class SettingsPage extends Component {
    render() {
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
                <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{width: 75, height: 75, borderRadius: 75/2}}
                        source={profilePicture}/></View>
                <View style={{flex: 4.5, width: '75%',justifyContent: 'center'}}>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <View>
                        <Text>Name</Text>
                        </View>
                        <View>
                        <TextInput style={{borderColor: 'black', borderWidth: 2, borderRadius: 4}}/>
                        </View>
                    </View>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <View>
                            <Text>Email</Text>
                        </View>
                        <View>
                            <TextInput style={{borderColor: 'black', borderWidth: 2, borderRadius: 4}}/>
                        </View>
                    </View>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <View>
                            <Text>PhoneNumber</Text>
                        </View>
                        <View>
                            <TextInput style={{borderColor: 'black', borderWidth: 2, borderRadius: 4}}/>
                        </View>
                    </View>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <View>
                            <Text>Edit Password</Text>
                        </View>
                        <View>
                            <TextInput style={{borderColor: 'black', borderWidth: 2, borderRadius: 4}}/>
                        </View>
                    </View>
                    <View style={{flex: 2.5}}>
                        <View>
                            <Text>Notes</Text>
                        </View>
                        <View>
                            <TextInput style={{borderColor: 'black', height: 100, borderWidth: 2, borderRadius: 4}}
                            multiline={true}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
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