import React from 'react';
import {View, Text, Platform, StatusBar, TextInput, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../stylesheets/AddPropertyStyleSheet';
import Header from './Header';
import Footer from './Footer';
import ModalSelector from 'react-native-modal-selector';
import { PropertyType } from '../../constants/enums/PropertyType';
import { CountryCode } from '../../constants/enums/CountryCode';
import { Province } from '../../constants/enums/Province';

const AddPropertyComponent = (props) => {

    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={formStyles.container}>
            <ScrollView style={{ flex: 6}}>
                <View style={{flex: 1}}>
                    <Header {...props}/>
                </View>
                <View style={formStyles.bodyContainer}>
                    <View style={formStyles.inputContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Property Type</Text>
                            <Text style={{color: 'red'}}> * </Text>
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
                                initValue='Select a property type...'
                                onChange={(option) => props.handlePropertyType(option)}
                                selectStyle={props.validPropertyType
                                    ? formStyles.pickerStyle
                                    : formStyles.invalidPickerStyle}
                                initValueTextStyle={{textAlign: 'left'}}
                                selectTextStyle={{textAlign: 'left'}}
                                style={{flex: 1}}/>
                        </View>
                    </View>
                    <View style={formStyles.inputContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Address</Text>
                            <Text style={{color: 'red'}}> * </Text>
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
                            <Text style={formStyles.infoHeader}>City</Text>
                            <Text style={{color: 'red'}}> * </Text>
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
                            <Text style={formStyles.infoHeader}>Province</Text>
                            <Text style={{color: 'red'}}> * </Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <ModalSelector
                                data={[
                                    {key: Province.QC, label: 'Quebec'},
                                ]}
                                initValue={props.province.label}
                                initValueTextStyle={{color: 'black', textAlign: 'left'}}
                                selectTextStyle={{textAlign: 'left'}}
                                disabled={true}
                                onChange={(option) => props.handleProvince(option)}
                                selectStyle={formStyles.disabledPickerStyle}
                                style={{flex: 1}}/>
                        </View>
                    </View>
                    <View style={formStyles.inputContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Postal Code</Text>
                            <Text style={{color: 'red'}}> * </Text>
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
                            <Text style={formStyles.infoHeader}>Country</Text>
                            <Text style={{color: 'red'}}> * </Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <ModalSelector
                                data={[
                                    {key: CountryCode.CA, label: 'Canada'},
                                ]}
                                initValue={props.country.label}
                                initValueTextStyle={{color: 'black', textAlign: 'left'}}
                                selectTextStyle={{textAlign: 'left'}}
                                onChange={(option) => props.handleCountry(option)}
                                disabled={true}
                                selectStyle={formStyles.disabledPickerStyle}
                                style={{flex: 1}}/>
                        </View>
                    </View>
                    <View style={formStyles.inputContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Name of Property</Text>
                            <Text style={{color: 'red'}}> * </Text>
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
                <View style={{flex: 1}}>
                    <Footer {...props}/>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

export default AddPropertyComponent;
