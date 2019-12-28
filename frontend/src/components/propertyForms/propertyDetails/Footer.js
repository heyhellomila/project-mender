import React from 'react';
import { footerStyles } from '../../../stylesheets/PropertyDetailsStyleSheet';
import { TouchableOpacity, View, Text } from 'react-native';

const Footer = (props) => {
    return(
        <View style={footerStyles.container}>
            <View style={footerStyles.colContainer}>
                <TouchableOpacity
                    disabled={props.loading}
                    style={footerStyles.editButton}
                    onPress={() => props.navigation.navigate('EditProperty')}>
                        <Text style={footerStyles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={footerStyles.colContainer}>
                <TouchableOpacity
                    disabled={props.loading}
                    style={footerStyles.deleteButton}
                    onPress={() => props.deleteProperty()}>
                        <Text style={footerStyles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Footer;
