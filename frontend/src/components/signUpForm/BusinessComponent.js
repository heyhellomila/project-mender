import { formStyles, typeStyles, businessStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const BusinessComponent = (props) => {
    return (
        <View style={businessStyles.container}>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.buttonContainer}
                    onPress={() => props.handleType('CONTRACTOR')}>
                    <Text style={formStyles.infoHeader}>Contractor</Text>
                    <Icon name='tools' type='octicon' size={30}/>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={typeStyles.buttonContainer}
                    onPress={() => props.handleType('INSPECTOR')}>
                    <Text style={formStyles.infoHeader}>Inspector</Text>
                    <Icon name='clipboard-pencil' type='foundation' size={30}/>
                </TouchableOpacity>
            </View>
                <View style={formStyles.rowContainer}>
                    <TouchableOpacity style={typeStyles.buttonContainer}
                        onPress={() => props.handleType('HYBRID')}>
                        <Text style={formStyles.infoHeader}>Both</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default BusinessComponent;
