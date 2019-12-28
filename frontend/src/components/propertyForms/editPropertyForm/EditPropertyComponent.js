import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../../stylesheets/EditPropertyStyleSheet';
import Header from './Header';
import { accountInfoStyles } from '../../../stylesheets/SignUpFormStyleSheet';
import Footer from './Footer';
import ModalSelector from 'react-native-modal-selector';
import {PropertyType} from '../../../constants/enums/PropertyType';

const EditPropertyComponent = (props) => {

    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={formStyles.container}>
            <ScrollView style={{ flex: 6}}>
                <View style={{flex: 1}}>
                    <Header {...props}/>
                </View>
                <View style={{flex: 4, paddingHorizontal: '7%'}}>
                    <View style={formStyles.inputContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Property Type</Text>
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
                                initValue={props.property.propertyType.replace('_', ' ')}
                                onChange={(option) => props.handlePropertyType(option)}
                                selectStyle={props.validPropertyType
                                    ? formStyles.pickerStyle
                                    : formStyles.invalidPickerStyle}
                                initValueTextStyle={{textAlign: 'left', color: 'black', textTransform: 'capitalize'}}
                                selectTextStyle={{textAlign: 'left'}}
                                style={{flex: 1}}/>
                        </View>
                    </View>
                    <View style={accountInfoStyles.inputGroup}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Name</Text>
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
};

export default EditPropertyComponent;
