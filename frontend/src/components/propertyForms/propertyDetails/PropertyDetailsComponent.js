import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../../stylesheets/PropertyDetailsStyleSheet';
import Header from './Header';
import Footer from './Footer';
import { countries } from 'country-data';
import {PropertyType} from "../../../constants/enums/PropertyType";
import ModalSelector from "react-native-modal-selector";

const PropertyDetailsComponent = (props) => {
    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={formStyles.container}>
            <ScrollView style={{ flex: 6}}>
                <View style={{flex: 1}}>
                    <Header {...props}/>
                </View>
                <View style={formStyles.bodyContainer}>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Property Type</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            {props.editing
                                ?
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
                                        initValue={props.property.propertyType.replace(/_/g, ' ')}
                                        onChange={(option) => props.handlePropertyType(option)}
                                        selectStyle={formStyles.pickerStyle}
                                        initValueTextStyle={{
                                            textAlign: 'left',
                                            color: 'black',
                                            textTransform: 'capitalize'
                                        }}
                                        selectTextStyle={{textAlign: 'left'}}
                                        style={{flex: 1}}
                                        overlayStyle={formStyles.pickerOverlayStyle}
                                    />
                                :
                                    <Text style={formStyles.infoText}>
                                        {props.property.propertyType.replace(/_/g, ' ')}
                                    </Text>
                            }
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Address</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.address}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>City</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.city}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Province</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.provinceText}>{props.property.province}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Postal Code</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.postalCode}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Country</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{countries[props.property.country].name}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Name of Property</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            {props.editing
                                ?
                                    <TextInput style = {props.validName
                                        ? formStyles.textInput
                                        : formStyles.invalidTextInput}
                                               defaultValue = {props.name}
                                               onChangeText = {(value) => props.handleName(value)}/>
                                :
                                    <Text style={formStyles.infoText}>
                                        {props.property.name}
                                    </Text>
                            }
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Footer {...props}/>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default PropertyDetailsComponent;
