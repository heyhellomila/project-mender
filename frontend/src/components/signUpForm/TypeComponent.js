import { formStyles, typeStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const TypeComponent = (props) => {
    return (
        <View style={{flex: 2, marginTop: '6%'}}>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.container}
                    onPress={() => props.handleType('HOMEOWNER')}>
                    <Text style={formStyles.infoHeader}>Homeowner</Text>
                    <Icon name='home' type='material-icon' size={30}/>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.container}
                    onPress={() => props.handleType('BUSINESS')}>
                    <Text style={formStyles.infoHeader}>Businessperson</Text>
                    <Icon name='work' type='material-icon' size={30}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TypeComponent;
