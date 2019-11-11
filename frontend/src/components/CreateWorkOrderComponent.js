import { createWorkOrderComponent } from '../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput, Switch, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import React from 'react';

const CreateWorkOrderComponent = (props) => {
    return (
        <KeyboardAvoidingView style={{paddingTop: '5%'}} enabled>
            <Button
            style={{alignSelf:'flex-end'}}
            title='close'
            onPress ={() => props.navigation.goBack(null)}/>
            <Text style={createWorkOrderComponent.headerStyle}>Work Order</Text>
            <Text style={createWorkOrderComponent.subHeaderStyle}>Property Number and Property Address</Text>
            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Text style = {props.correctiveStyle()}
                        onPress = {() => props.toggleCorrective()} >Corrective</Text>
                </View>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Text style={props.preventiveStyle()}
                        onPress = {() => props.togglePreventive()}>Preventive</Text>
                </View>
            </View>

            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Text style={createWorkOrderComponent.textOnBlue}>Sector</Text>
                </View>
                <View style={createWorkOrderComponent.individualContainer}>
                    <View style={createWorkOrderComponent.textOnWhite}>  
                        <RNPickerSelect value = {props.sector} 
                            style={createWorkOrderComponent.pickerComponent} 
                            onValueChange = {(value) => props.handleSector(value)}
                            items={[
                                { label: 'Kitchen', value: 'KITCHEN' },
                                { label: 'Utilities', value: 'UTILITIES' },
                                { label: 'Living Room', value: 'LIVINGROOM' },
                                { label: 'Bathroom', value: 'BATHROOM' },
                                { label: 'Appliances', value: 'APPLIANCES' },
                                { label: 'Bedroom', value: 'BEDROOM' },
                                { label: 'Balcony', value: 'BALCONY' },
                                { label: 'Garage', value: 'GARAGE' },
                                { label: 'Envelope', value: 'ENVELOPE' },
                                { label: 'Electrical', value: 'ELECTRICAL' },
                                { label: 'HVAC', value: 'HVAC' },
                                { label: 'Other', value: 'OTHER' }
                            ]}
                        />
                    </View>
                </View>
            </View>

            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Text style={createWorkOrderComponent.textOnBlue}>Title</Text>
                </View>
                <View style={createWorkOrderComponent.individualContainer}>
                    <TextInput style = {createWorkOrderComponent.textOnWhite}
                        placeholder = 'title'
                        onChangeText = {(value) => props.handleTitle(value)}/>
                </View>
            </View>

            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Text style={createWorkOrderComponent.textOnBlue}>Cause</Text>
                </View>
                <View style={createWorkOrderComponent.individualContainer}>
                    <TextInput style={createWorkOrderComponent.textOnWhite}
                        placeholder = 'cause'
                        onChangeText = {(value) => props.handleCause(value)}/>
                </View>
            </View>
            
            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Text style={createWorkOrderComponent.textOnBlue}>Service needed?</Text>
                </View>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Switch 
                        onValueChange = {(value) => props.toggleServiceNeeded(value)}
                        value = {props.serviceNeeded}/>
                </View>
            </View>

            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.individualContainer}>
                    <Text style={createWorkOrderComponent.textOnBlue}>Urgency</Text>
                </View>
                <View style={createWorkOrderComponent.individualContainer}>
                    <View style={createWorkOrderComponent.textOnWhite}>  
                    <RNPickerSelect value = {props.priority} 
                        style={createWorkOrderComponent.pickerComponent} 
                        onValueChange = {(value) => props.handlePriority(value)}
                        items={[
                            { label: 'LOW', value: 'LOW' },
                            { label: 'MEDIUM', value: 'MEDIUM' },
                            { label: 'HIGH', value: 'HIGH' }
                        ]}
                    />
                    </View>    
                </View>
            </View>
            
            <View style={createWorkOrderComponent.rowContainer}>
                <TextInput  
                    style={createWorkOrderComponent.notesInput}
                    placeholder = 'Notes/additional information'
                    onChangeText = {(value) => props.handleDescription(value)}/>
            </View>
            <Button 
                style={{alignSelf:'flex-end', width: '100%'}}
                title='Submit'
                onPress ={() => props.handleWorkOrder()}/>
        </KeyboardAvoidingView>
    );
}

export default CreateWorkOrderComponent;
