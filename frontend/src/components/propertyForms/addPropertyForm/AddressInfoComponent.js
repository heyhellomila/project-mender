import { formStyles } from '../../../stylesheets/AddPropertyStyleSheet';
import { Text, TextInput, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Province } from '../../../constants/enums/Province';
import { CountryCode } from '../../../constants/enums/CountryCode';
import React from 'react';

const AddressInfoComponent = (props) => {
    return(
        <View style={formStyles.addressContainer}>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>
                        Address
                        <Text style={formStyles.asteriskStyle}> * </Text>
                    </Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validAddress
                        ? formStyles.textInput
                        : formStyles.invalidTextInput}
                               defaultValue = {props.address}
                               onChangeText = {(value) => props.handleAddress(value)}/>
                </View>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Apartment, suite, etc.</Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {formStyles.textInput}
                               defaultValue = {props.addressInfo}
                               onChangeText = {(value) => props.handleAddressInfo(value)}/>
                </View>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>
                        City
                        <Text style={formStyles.asteriskStyle}> * </Text>
                    </Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validCity
                        ? formStyles.textInput
                        : formStyles.invalidTextInput}
                               defaultValue = {props.city}
                               onChangeText = {(value) => props.handleCity(value)}/>
                </View>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>
                        Province
                        <Text style={formStyles.asteriskStyle}> * </Text>
                    </Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <ModalSelector
                        data={[
                            {key: Province.QC, label: 'Quebec'},
                        ]}
                        initValue={props.province.label}
                        initValueTextStyle={formStyles.pickerText}
                        disabled={true}
                        onChange={(option) => props.handleProvince(option)}
                        selectStyle={formStyles.disabledPickerStyle}
                        style={formStyles.pickerStyle}/>
                </View>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>
                        Postal Code
                        <Text style={formStyles.asteriskStyle}> * </Text>
                    </Text>
                </View>
                <View style={formStyles.rowContainer}>
                    <TextInput style = {props.validPostalCode
                        ? formStyles.textInput
                        : formStyles.invalidTextInput}
                               defaultValue = {props.postalCode}
                               onChangeText = {(value) => props.handlePostalCode(value)}/>
                </View>
            </View>
            <View style={formStyles.inputContainer}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>
                        Country
                        <Text style={formStyles.asteriskStyle}> * </Text>
                    </Text>
                </View>
                <View style={formStyles.inputContainer}>
                <View style={formStyles.rowContainer}>
                    <ModalSelector
                        data={[
                            {key: CountryCode.CA, label: 'Canada'},
                        ]}
                        initValue={props.country.label}
                        initValueTextStyle={formStyles.pickerText}
                        onChange={(option) => props.handleCountry(option)}
                        disabled={true}
                        selectStyle={formStyles.disabledPickerStyle}
                        style={formStyles.pickerStyle}/>
                </View>
                </View>
            </View>
        </View>
    );
};

export default AddressInfoComponent;