import { createWorkOrderComponent } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import  { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import Header from './Header';

const Overview = (props) => {
    return (
        <KeyboardAwareScrollView scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{flex: 6, paddingHorizontal: '5%', backgroundColor: '#f0f0f0'}}>
            <View style={{flex: 1}}>
                <Header {...props} headerText={'Overview'}></Header>
            </View>
            <View style={{flex: 4}}>
                <View style={createWorkOrderComponent.rowContainer}>
                    <View style={createWorkOrderComponent.colContainer}>
                        <TouchableOpacity
                            style = {props.type == 'CM' ? createWorkOrderComponent.selectedGray 
                                : createWorkOrderComponent.unselectedGray}
                            onPress={() => props.handleType('CM')}>
                            <Text style={createWorkOrderComponent.typeText}>
                                Corrective
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={createWorkOrderComponent.colContainer}>
                        <TouchableOpacity
                            style = {props.type == 'PM' ? createWorkOrderComponent.selectedGray
                                : createWorkOrderComponent.unselectedGray}
                            onPress={() => props.handleType('PM')}>
                            <Text style={createWorkOrderComponent.typeText}>
                                Preventive
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1, marginVertical: '6%'}}>
                    <View style={createWorkOrderComponent.rowContainer}>
                        <Text style={createWorkOrderComponent.infoHeader}>Title</Text>
                    </View>
                    <View style={createWorkOrderComponent.rowContainer}>
                        <TextInput style = {props.validTitle 
                            ? createWorkOrderComponent.generalTextInput 
                            : createWorkOrderComponent.invalidGeneralTextInput}
                            defaultValue = {props.title}
                            onChangeText = {(value) => props.handleTitle(value)}/>
                    </View>
                </View>
                <View style={{flex: 1, marginVertical: '6%'}}>
                    <View style={createWorkOrderComponent.rowContainer}>
                        <Text style={createWorkOrderComponent.infoHeader}>Cause</Text>
                    </View>
                    <View style={createWorkOrderComponent.rowContainer}>
                        <TextInput style = {props.validCause 
                                ? createWorkOrderComponent.generalTextInput 
                                : createWorkOrderComponent.invalidGeneralTextInput}
                                defaultValue = {props.cause}
                            onChangeText = {(value) => props.handleCause(value)}/>
                    </View>
                </View>
            </View>
            <View style={{flex: 1}}>
                <View style={createWorkOrderComponent.rowContainer}>
                    <View style={createWorkOrderComponent.colContainer}>
                        <TouchableOpacity style={createWorkOrderComponent.leftButton} 
                            onPress={() => props.prevStep()}>
                            <Text style={createWorkOrderComponent.buttonText}>Previous</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={createWorkOrderComponent.colContainer}>
                        <TouchableOpacity style={createWorkOrderComponent.rightButton} 
                            onPress={() => props.nextStep()}>
                            <Text style={createWorkOrderComponent.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Overview;
