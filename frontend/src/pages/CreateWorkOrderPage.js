import React from 'react';
import { View, Picker, Text, TextInput, Switch, Button, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder';
import { connect } from 'react-redux';
import { createWorkOrderPage } from '../stylesheets/CreateWorkOrderPageStyleSheet';

class CreateWorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            propertyId: '5dc398c35c942a071043e187',
            sector: 'ROOF',
            type: 'IMP', 
            title: 'untitled', 
            cause: 'no cause', 
            serviceNeeded: false, 
            priority: 'MEDIUM', 
            description: 'no description', 
            dueDate: '2020-11-07T03:54:52.130+00:00',
            price_estimate: 0
        };
    }
    static navigationOptions = {
        title: 'Create Work Order',
    };
    
    handleWorkOrder = async() => {
        try {
            await createWorkOrder(
                this.state.propertyId,
                this.state.sector,
                this.state.type,
                this.state.title,
                this.state.cause,
                this.state.serviceNeeded,
                this.state.priority,
                this.state.description,
                this.state.dueDate,
                this.state.price_estimate).then(async() => {
                        this.props.navigation.goBack(null);
                });
        } catch (err) {
            //console.log(JSON.stringify(err.response));
        }
    }

    toggleCorrective = () => {
        if(this.state.type == 'CM'){
            this.setState({type: 'IMP'});
        }
        else{
            this.setState({type: 'CM'});
        }

    }

    togglePreventive = () => {
        if(this.state.type == 'PM'){
            this.setState({type: 'IMP'});
        }
        else{
            this.setState({type: 'PM'});
        }

    }

    handleSector = (value) => {
        this.setState({sector: value});
    }

    handleTitle = (value) => {
        this.setState({title: value});
    }
    
    handleCause = (value) => {
        this.setState({cause: value});
    }

    toggleServiceNeeded = (value) => {
        this.setState({serviceNeeded: value});
    }

    handleDescription = (value) => {
        this.setState({description: value});
    }

    handlePriority = (value) => {
        this.setState({priority: value});
    }

    correctiveStyle = function() {
        if(this.state.type === 'CM'){
            return createWorkOrderPage.selectedGray;
        }
        else{
            return createWorkOrderPage.unselectedGray;
        }
    }

    preventiveStyle = function() {
        if(this.state.type === 'PM'){
            return createWorkOrderPage.selectedGray;
        }
        else{
            return createWorkOrderPage.unselectedGray;
        }
    }
    
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

const mapStateToProps = (state) => ({
    user: state.user,
    property: state.property
});

export default connect(mapStateToProps, null)(CreateWorkOrderPage);