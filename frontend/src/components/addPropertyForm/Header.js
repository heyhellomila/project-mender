import { headerStyles } from '../../stylesheets/AddPropertyStyleSheet';
import { Text, SafeAreaView } from 'react-native';
import React from 'react';
const x = require('../../../assets/X.png');

const Header = () => {
    return (
        <SafeAreaView style={headerStyles.container}>
            <Text style={headerStyles.headerStyle}>Add a Property</Text>
        </SafeAreaView>
    );
};

export default Header;
