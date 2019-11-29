import React from 'react';
import {View, Text, Platform, StatusBar, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { formStyles } from '../../stylesheets/AddPropertyStyleSheet';
import Header from './Header';
import Footer from './Footer';
import ModalSelector from "react-native-modal-selector";

const AddPropertyComponent = (props) => {

    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={[formStyles.container, {flex: 1, paddingTop:
                                         (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0}]}>
            <View style={{flex: 1}}>
                <Header/>
            </View>
            <View style={{flex: 4}}>
                <View style={{flex: 1, marginVertical: '6%'}}>
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
                <View style={{flex: 1, marginVertical: '6%'}}>
                    <View style={formStyles.rowContainer}>
                        <Text style={formStyles.infoHeader}>Address</Text>
                    </View>
                    <View style={formStyles.rowContainer}>
                        <TextInput style = {props.validAddress
                            ? formStyles.textInput
                            : formStyles.invalidTextInput}
                                   defaultValue = {props.address}
                                   onChangeText = {(value) => props.handleAddress(value)}/>
                    </View>
                </View>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Property Type</Text>
                    <View style={formStyles.colContainer}>
                        <ModalSelector
                            data={[
                                {key: 0, label: 'CONDOMINIUM'},
                                {key: 1, label: 'SINGLE FAMILY HOME'},
                                {key: 2, label: 'TOWNHOUSE'},
                                {key: 3, label: 'DUPLEX'},
                                {key: 4, label: 'TRIPLEX'},
                                {key: 5, label: 'MULTIPLEX'},
                                {key: 6, label: 'COTTAGE'},
                                {key: 7, label: 'MOBILE_HOME'}
                            ]}
                            initValue={props.propertyType}
                            initValueTextStyle={{color: 'black'}}
                            onChange={(option) => props.handlePropertyType(option.label)}
                            childrenContainerStyle	={formStyles.pickerStyle}/>
                    </View>
                </View>
            </View>
            <View style={{flex: 1}}>
                <Footer {...props}/>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default AddPropertyComponent;
