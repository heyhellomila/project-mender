import { formStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput } from 'react-native';
import React from 'react';

const Overview = (props) => {
    return (
        <View style= {[formStyles.colContainer, {flexWrap: 'wrap', marginTop: '3%', marginBottom: '-5%'}]}>
            <View style={formStyles.titleInputGroup}>
                <View style={formStyles.infoHeaderContainer}>
                    <Text adjustsFontSizeToFit={true} style={formStyles.infoHeader}>Title</Text>
                </View>
                <View style={formStyles.textInputContainer}>
                    <TextInput style = {[props.validTitle
                        ? formStyles.textInput
                        : formStyles.invalidTextInput, formStyles.titleTextInput]}
                               defaultValue = {props.title}
                               onChangeText = {(value) => props.handleTitle(value)}/>
                </View>
            </View>
            <View style={formStyles.inputGroup}>
                <View style={formStyles.infoHeaderContainer}>
                    <Text adjustsFontSizeToFit={true} style={formStyles.infoHeader}>Notification</Text>
                </View>
                <View style={formStyles.textInputContainer}>
                    <TextInput style = {[formStyles.textInput, formStyles.multiLineTextInput]}
                               multiline={true}
                               defaultValue = {props.notification}
                               onChangeText = {(value) => props.handleNotification(value)}/>
                </View>
            </View>
            <View style={formStyles.inputGroup}>
                <View style={formStyles.infoHeaderContainer}>
                    <Text adjustsFontSizeToFit={true} style={formStyles.infoHeader}>Cause</Text>
                </View>
                <View style={formStyles.textInputContainer}>
                    <TextInput style = {[formStyles.textInput, formStyles.multiLineTextInput]}
                               multiline={true}
                               defaultValue = {props.cause}
                               onChangeText = {(value) => props.handleCause(value)}/>
                </View>
            </View>
            <View style={formStyles.inputGroup}>
                <View style={formStyles.infoHeaderContainer}>
                    <Text adjustsFontSizeToFit={true} style={formStyles.infoHeader}>Location</Text>
                </View>
                <View style={formStyles.textInputContainer}>
                    <TextInput style = {formStyles.textInput}
                               defaultValue = {props.location}
                               onChangeText = {(value) => props.handleLocation(value)}/>
                </View>
            </View>
        </View>
    );
};

export default Overview;
