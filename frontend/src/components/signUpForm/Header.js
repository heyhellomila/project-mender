import { headerStyles, formStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
const x = require('../../../assets/X.png');

const Header = (props) => {
    return (
        <SafeAreaView style={headerStyles.container}>
            {props.step === 1 && 
                <Text style={headerStyles.headerStyle}>What is your name?</Text>}
            {props.step === 2 && 
                <Text style={headerStyles.headerStyle}>You are a...</Text>}
            {props.step === 3 && 
                <Text style={headerStyles.headerStyle}>What is your expertise?</Text>}
            {props.step === 4 && 
                <Text style={headerStyles.headerStyle}>Your information</Text>}
        </SafeAreaView>
    );
};

export default Header;
