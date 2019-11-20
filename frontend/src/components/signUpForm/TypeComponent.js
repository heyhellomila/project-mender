import { formStyles, typeStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const TypeComponent = (props) => {
    return (
        <View style={typeStyles.container}>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.buttonContainer}
                    onPress={() => props.handleType('HOMEOWNER')}>
                    <Text style={formStyles.infoHeader}>Homeowner</Text>
                    <Icon name='home' type='material-icon' size={30}/>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.buttonContainer}
                    onPress={() => props.handleType('BUSINESS')}>
                    <Text style={formStyles.infoHeader}>Businessperson</Text>
                    <Icon name='work' type='material-icon' size={30}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TypeComponent;
