import { headerStyles } from '../../../stylesheets/AddPropertyStyleSheet';
import {Text, SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
const x = require('../../../../assets/X.png');

const Header = (props) => {
    return (
        <SafeAreaView style={headerStyles.container}>
            <View>
                <Text style={headerStyles.headerStyle}>New Property</Text>
            </View>
            <View style={headerStyles.closeButton}>
                <TouchableOpacity style={headerStyles.closeButton}
                                  onPress={() => props.navigation.goBack(null)}>
                    <Image style={headerStyles.closeButtonImage} source={x}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Header;
