import { formStyles, typeStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const BusinessComponent = (props) => {
    return (
        <View style={{flex: 3, marginTop: '6%'}}>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.container}
                    onPress={() => props.handleType('CONTRACTOR')}>
                    <Text style={formStyles.infoHeader}>Contractor</Text>
                    <Icon name='tools' type='octicon' size={30}/>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.container}
                    onPress={() => props.handleType('INSPECTOR')}>
                    <Text style={formStyles.infoHeader}>Inspector</Text>
                    <Icon name='clipboard-pencil' type='foundation' size={30}/>
                </TouchableOpacity>
            </View>
                <View style={formStyles.rowContainer}>
                    <TouchableOpacity style={typeStyles.container}
                        onPress={() => props.handleType('HYBRID')}>
                        <Text style={formStyles.infoHeader}>Both</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default BusinessComponent;
