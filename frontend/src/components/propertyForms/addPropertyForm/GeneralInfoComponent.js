import { formStyles } from '../../../stylesheets/AddPropertyStyleSheet';
import { Text, TextInput, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { PropertyType } from '../../../constants/enums/PropertyType';
import React from 'react';

const GeneralInfoComponent = (props) => {
    return(
        <View style={formStyles.generalInfoContainer}>
            <View style={formStyles.generalInfoInputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>
                        Property Type
                        <Text style={formStyles.asteriskStyle}> * </Text>
                    </Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <ModalSelector
                        data={[
                            {key: PropertyType.CONDOMINIUM, label: 'Condominium'},
                            {key: PropertyType.SINGLE_FAMILY_HOME, label: 'Single Family Home'},
                            {key: PropertyType.TOWNHOUSE, label: 'Townhouse'},
                            {key: PropertyType.DUPLEX, label: 'Duplex'},
                            {key: PropertyType.TRIPLEX, label: 'Triplex'},
                            {key: PropertyType.MULTIPLEX, label: 'Multiplex'},
                            {key: PropertyType.COTTAGE, label: 'Cottage'},
                            {key: PropertyType.MOBILE_HOME, label: 'Mobile Home'}
                        ]}
                        initValue={props.propertyType.key
                            ? props.propertyType.label
                            : 'Select a property type...'}
                        onChange={(option) => props.handlePropertyType(option)}
                        selectStyle={props.validPropertyType
                            ? formStyles.pickerSelectStyle
                            : formStyles.invalidPickerSelectStyle}
                        initValueTextStyle={props.propertyType.key
                            ? formStyles.pickerText
                            : formStyles.unselectedPickerText}
                        selectTextStyle={formStyles.pickerText}
                        style={formStyles.pickerStyle}
                        overlayStyle={formStyles.pickerOverlayStyle}/>
                </View>
            </View>
            <View style={formStyles.generalInfoInputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>
                        Name of Property
                        <Text style={formStyles.asteriskStyle}> * </Text>
                    </Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validName
                        ? formStyles.textInput
                        : formStyles.invalidTextInput}
                               defaultValue = {props.name}
                               onChangeText = {(value) => props.handleName(value)}/>
                </View>
            </View>
        </View>
    );
};

export default GeneralInfoComponent;