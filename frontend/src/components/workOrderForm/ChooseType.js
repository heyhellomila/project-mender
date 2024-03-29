import {formStyles, sectorStyles, typeStyles} from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const CM = require('../../../assets/Other_icons/Corrective.png');
const PM = require('../../../assets/Other_icons/Preventive.png');

const ChooseType = (props) => {
    return (
        <View style= {formStyles.chooseTypeContainer}>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity
                    style = {props.type === 'PM'
                        ? typeStyles.selectedTypeContainer
                        : typeStyles.typeContainer}
                    onPress={() => props.handleType('PM')}>
                    <Image style={[typeStyles.typeIcon, typeStyles.preventiveIcon]} source={PM}/>
                    <Text style={typeStyles.subHeader}>
                        Preventive
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity
                    style = {props.type === 'CM'
                        ? typeStyles.selectedTypeContainer
                        : typeStyles.typeContainer}
                    onPress={() => props.handleType('CM')}>
                    <Image style={typeStyles.typeIcon} source={CM}/>
                    <Text style={typeStyles.subHeader}>
                        Corrective
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChooseType;
