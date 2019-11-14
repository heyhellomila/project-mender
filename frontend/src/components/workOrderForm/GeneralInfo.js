import { createWorkOrderComponent } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

const GeneralInfo = (props) => {
    return (
        <View style={{flex: 1, marginTop: '-5%'}}>
            <View style={createWorkOrderComponent.typesContainer}>
                <TouchableOpacity
                    style = {props.type == 'CM' ? createWorkOrderComponent.selectedGray : createWorkOrderComponent.unselectedGray}
                    onPress={() => props.handleType('CM')}>
                    <Text style={createWorkOrderComponent.typeText}>
                        Corrective
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style = {props.type == 'PM' ? createWorkOrderComponent.selectedGray : createWorkOrderComponent.unselectedGray}
                    onPress={() => props.handleType('PM')}>
                    <Text style={createWorkOrderComponent.typeText}>
                        Preventive
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {props.type == 'IMP' ? createWorkOrderComponent.selectedGray : createWorkOrderComponent.unselectedGray}
                    onPress={() => props.handleType('IMP')}>
                    <Text style={createWorkOrderComponent.typeText}>
                        Improvement
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={createWorkOrderComponent.rowContainer}>
                <TouchableOpacity disabled={true} style={[createWorkOrderComponent.textBackground, createWorkOrderComponent.colContainer]}>
                    <Text style={createWorkOrderComponent.infoHeader}>Title</Text>
                </TouchableOpacity>
                <View style={createWorkOrderComponent.colContainer}>
                    <TextInput style = {createWorkOrderComponent.generalTextInput}
                        onChangeText = {(value) => props.handleTitle(value)}/>
                </View>
            </View>
            <View style={createWorkOrderComponent.rowContainer}>
                <TouchableOpacity disabled={true} style={[createWorkOrderComponent.textBackground, createWorkOrderComponent.colContainer]}>
                    <Text style={createWorkOrderComponent.infoHeader}>Cause</Text>
                </TouchableOpacity>
                <View style={createWorkOrderComponent.colContainer}>
                    <TextInput style={createWorkOrderComponent.generalTextInput}
                        onChangeText = {(value) => props.handleCause(value)}/>
                </View>
            </View>
            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.colContainer}>
                    <TouchableOpacity style={{alignSelf:'flex-start'}} onPress={() => props.prevStep()}>
                        <Text>Previous</Text>
                    </TouchableOpacity>
                </View>
                <View style={createWorkOrderComponent.colContainer}>
                    <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => props.nextStep()}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default GeneralInfo;
