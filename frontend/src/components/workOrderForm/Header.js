import { createWorkOrderComponent } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
x = require('../../../assets/X.png');

const Header = (props) => {
    return (
        <SafeAreaView style={{paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0 }}>
            <View>
                <View style={createWorkOrderComponent.colContainer}>
                    <Text style={createWorkOrderComponent.headerStyle}>{props.headerText}</Text>
                    <Text style={createWorkOrderComponent.subHeaderStyle}>{props.property.name} ({props.property.address})</Text>
                </View>
                <View style={createWorkOrderComponent.closeButton}>
                    <TouchableOpacity style={createWorkOrderComponent.closeButton} onPress={() => props.navigation.goBack(null)}>
                        <Image style={createWorkOrderComponent.closeButtonImage} source={x}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Header;
