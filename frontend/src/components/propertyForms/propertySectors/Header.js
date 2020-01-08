import { headerStyles } from '../../../stylesheets/PropertySectorsStyleSheet';
import {Text, SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
const x = require('../../../../assets/X.png');

const Header = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <View>
                    <Text style={headerStyles.headerStyle}>Sectors</Text>
                </View>
                <View style={headerStyles.closeButton}>
                    <TouchableOpacity style={headerStyles.closeButton} onPress={() => props.navigation.goBack(null)}>
                        <Image style={headerStyles.closeButtonImage} source={x}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Header;
