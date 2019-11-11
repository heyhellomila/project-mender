import React, { Component } from 'react';
import { createWorkOrderPage } from '../stylesheets/CreateWorkOrderPageStyleSheet';

class CreateWorkOrderComponent extends Component{
    render() {
        return (
            
            //buttonFunction={() => this.props.navigation.goBack(null)
            <KeyboardAvoidingView style={createWorkOrderPage.elementsContainer} behavior="position" enabled>
                <Button 
                style={{alignSelf:'flex-end', position:'absolute', width: 100}}
                title='close'
                onPress ={() => this.props.navigation.goBack(null)}/>
            <Text style={createWorkOrderPage.headerStyle}>Work Order</Text>
            <Text style={createWorkOrderPage.subHeaderStyle}>Property Number and Property Address</Text>
                <View style={createWorkOrderPage.rowContainer}>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Text style = {this.correctiveStyle()}
                           onPress = {this.toggleCorrective} >Corrective</Text>
                    </View>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Text style={this.preventiveStyle()}
                            onPress = {this.togglePreventive}>Preventive</Text>
                    </View>
                </View>

                <View style={createWorkOrderPage.rowContainer}>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Text style={createWorkOrderPage.textOnBlue}>Sector</Text>
                    </View>
                    <View style={createWorkOrderPage.individualContainer}>
                        <View style={createWorkOrderPage.textOnWhite}>  
                            <RNPickerSelect value = {this.state.sector} style={createWorkOrderPage.pickerComponent} onValueChange = {this.handleSector}
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

                <View style={createWorkOrderPage.rowContainer}>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Text style={createWorkOrderPage.textOnBlue}>Title</Text>
                    </View>
                    <View style={createWorkOrderPage.individualContainer}>
                        <TextInput style = {createWorkOrderPage.textOnWhite}
                            placeholder = 'title'
                            onChangeText = {this.handleTitle}/>
                    </View>
                </View>

                <View style={createWorkOrderPage.rowContainer}>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Text style={createWorkOrderPage.textOnBlue}>Cause</Text>
                    </View>
                    <View style={createWorkOrderPage.individualContainer}>
                        <TextInput style={createWorkOrderPage.textOnWhite}
                            placeholder = 'cause'
                            onChangeText = {this.handleCause}/>
                    </View>
                </View>
                
                <View style={createWorkOrderPage.rowContainer}>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Text style={createWorkOrderPage.textOnBlue}>Service needed?</Text>
                    </View>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Switch 
                            style={{alignSelf:'center'}}
                            onValueChange = {this.toggleServiceNeeded}
                            value = {this.state.serviceNeeded}/>
                    </View>
                </View>

                <View style={createWorkOrderPage.rowContainer}>
                    <View style={createWorkOrderPage.individualContainer}>
                        <Text style={createWorkOrderPage.textOnBlue}>Urgency</Text>
                    </View>
                    <View style={createWorkOrderPage.individualContainer}>
                        <View style={createWorkOrderPage.textOnWhite}>  
                        <RNPickerSelect value = {this.state.priority} style={createWorkOrderPage.pickerComponent} onValueChange = {this.handlePriority}
                            items={[
                                { label: 'LOW', value: 'LOW' },
                                { label: 'MEDIUM', value: 'MEDIUM' },
                                { label: 'HIGH', value: 'HIGH' }
                            ]}
                        />
                        </View>    
                    </View>
                </View>
                
                <View style={createWorkOrderPage.rowContainer}>
                    <TextInput  
                        style={createWorkOrderPage.notesInput}
                        placeholder = 'Notes/additional information'
                        onChangeText = {this.handleDescription}/>
                </View>
                <Button 
                    style={{alignSelf:'flex-end', position:'absolute', width: 100}}
                    title='Done'
                    onPress ={this.handleWorkOrder}/>
            </KeyboardAvoidingView>
        );
    }
}