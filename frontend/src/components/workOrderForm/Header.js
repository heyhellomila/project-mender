import { headerStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
const x = require('../../../assets/X.png');

const Header = (props) => {
    return (
        <SafeAreaView style={headerStyles.container}>
            <View style={headerStyles.titleContainer}>
                <Text style={headerStyles.headerStyle}>{props.headerText}</Text>
                <Text style={headerStyles.subHeaderStyle}>{props.property.name} ({props.property.address})</Text>
            </View>
            <View style={headerStyles.closeButton}>
                <TouchableOpacity style={headerStyles.closeButton} onPress={() => props.navigation.goBack(null)}>
                    <Image style={headerStyles.closeButtonImage} source={x}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Header;
