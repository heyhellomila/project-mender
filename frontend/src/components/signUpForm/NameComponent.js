import { formStyles, nameStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { View, Text, TextInput } from 'react-native';
import React from 'react';

const NameComponent = (props) => {
    return (
        <View style= {{flex: 3}}>
            <View style={nameStyles.inputGroup}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>First name</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validFirstName 
                        ? formStyles.textInput 
                        : formStyles.invalidTextInput}
                        defaultValue = {props.firstName}
                        onChangeText = {(value) => props.handleFirstName(value)}/>
                </View>
            </View>
            <View style={nameStyles.inputGroup}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Last name</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validLastName 
                        ? formStyles.textInput 
                        : formStyles.invalidTextInput}
                        defaultValue = {props.lastName}
                        onChangeText = {(value) => props.handleLastName(value)}/>
                </View>
            </View>
            <View style={formStyles.rowContainer}></View>
        </View>
    );
};

export default NameComponent;
