import { formStyles, typeStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

const Overview = (props) => {
    return (
        <View style= {{flex: 1}}>
            <View style={formStyles.rowContainer}>
                <View style={formStyles.colContainer}>
                    <TouchableOpacity
                        style = {props.type === 'CM' ? typeStyles.selectedGray 
                            : typeStyles.unselectedGray}
                        onPress={() => props.handleType('CM')}>
                        <Text style={typeStyles.typeText}>
                            Corrective
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={formStyles.colContainer}>
                    <TouchableOpacity
                        style = {props.type === 'PM' ? typeStyles.selectedGray
                            : typeStyles.unselectedGray}
                        onPress={() => props.handleType('PM')}>
                        <Text style={typeStyles.typeText}>
                            Preventive
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, marginVertical: '6%'}}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Title</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validTitle 
                        ? formStyles.textInput 
                        : formStyles.invalidTextInput}
                        nativeID = 'name'
                        defaultValue = {props.title}
                        onChangeText = {(event) => props.handleTitle(event)}/>
                </View>
            </View>
            <View style={{flex: 1, marginVertical: '6%'}}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Cause</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validCause 
                            ? formStyles.textInput 
                            : formStyles.invalidTextInput}
                            defaultValue = {props.cause}
                        onChangeText = {(value) => props.handleCause(value)}/>
                </View>
            </View>
        </View>
    );
};

export default Overview;
