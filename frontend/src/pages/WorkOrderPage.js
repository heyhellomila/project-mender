import React from 'react';
import { View, Picker, Text, TextInput, Switch, Button, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder'
import { connect } from 'react-redux';
import { workOrderPage } from '../stylesheets/WorkOrderPageStyleSheet'

class WorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            property_id: '5dc398c35c942a071043e187',
            sector: 'ROOF',
            type: 'IMP', 
            title: 'untitled', 
            cause: 'no cause', 
            service_needed: false, 
            priority: 'MEDIUM', 
            description: 'no description', 
            due_date: '2020-11-07T03:54:52.130+00:00',
            price_estimate: 0
        }
    }
    static navigationOptions = {
        title: 'Create Work Order',
    };
    
    handleWorkOrder = async() => {
        try {
            await createWorkOrder(
                this.state.property_id,
                this.state.sector,
                this.state.type,
                this.state.title,
                this.state.cause,
                this.state.service_needed,
                this.state.priority,
                this.state.description,
                this.state.due_date,
                this.state.price_estimate).then(async() => {
                        this.props.navigation.goBack(null)
                });
        } catch (err) {
            console.log(JSON.stringify(err.response))
            console.log('' + this.state.property_id + '\n' + 
                this.state.sector + '\n' +
                this.state.type + '\n' + 
                this.state.title + '\n' + 
                this.state.cause + '\n' + 
                this.state.service_needed + '\n' + 
                this.state.priority + '\n' + 
                this.state.description + '\n' + 
                this.state.due_date + '\n' + 
                this.state.price_estimate + '\n' +
                err.response.data);
        }
    }

    toggleCorrective = () => {
        if(this.state.type == 'CM'){
            this.setState({type: 'IMP'})
        }
        else{
            this.setState({type: 'CM'})
        }

    }

    togglePreventive = () => {
        if(this.state.type == 'PM'){
            this.setState({type: 'IMP'})
        }
        else{
            this.setState({type: 'PM'})
        }

    }

    handleSector = (sector) => {
        this.setState({sector: sector})
    }

    handleTitle = (title) => {
        this.setState({title: title})
    }
    
    handleCause = (cause) => {
        this.setState({cause: cause})
    }

    toggleServiceNeeded = (value) => {
        this.setState({service_needed: value})
    }

    handleDescription = (description) => {
        this.setState({description: description})
    }

    handlePriority = (priority) => {
        this.setState({priority: priority})
    }

    correctiveStyle = function() {
        if(this.state.type == 'CM'){
            return workOrderPage.selectedGray;
        }
        else{
            return workOrderPage.unselectedGray;
        }
    }

    preventiveStyle = function() {
        if(this.state.type == 'PM'){
            return workOrderPage.selectedGray;
        }
        else{
            return workOrderPage.unselectedGray;
        }
    }
    
    render() {
        return (
            
            //buttonFunction={() => this.props.navigation.goBack(null)
            <KeyboardAvoidingView style={workOrderPage.elementsContainer} behavior="position" enabled>
                <Button 
                style={{alignSelf:'flex-end', position:'absolute', width: 100}}
                title='close'
                onPress ={() => this.props.navigation.goBack(null)}/>
            <Text style={workOrderPage.headerStyle}>Work Order</Text>
            <Text style={workOrderPage.subHeaderStyle}>Property Number and Property Address</Text>
                <View style={workOrderPage.rowContainer}>
                    <View style={workOrderPage.individualContainer}>
                        <Text style = {this.correctiveStyle()}
                           onPress = {this.toggleCorrective} >Corrective</Text>
                    </View>
                    <View style={workOrderPage.individualContainer}>
                        <Text style={this.preventiveStyle()}
                            onPress = {this.togglePreventive}>Preventive</Text>
                    </View>
                </View>

                <View style={workOrderPage.rowContainer}>
                    <View style={workOrderPage.individualContainer}>
                        <Text style={workOrderPage.textOnBlue}>Sector</Text>
                    </View>
                    <View style={workOrderPage.individualContainer}>
                        <View style={workOrderPage.textOnWhite}>  
                            <RNPickerSelect value = {this.state.sector} style={workOrderPage.pickerComponent} onValueChange = {this.handleSector}
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

                <View style={workOrderPage.rowContainer}>
                    <View style={workOrderPage.individualContainer}>
                        <Text style={workOrderPage.textOnBlue}>Title</Text>
                    </View>
                    <View style={workOrderPage.individualContainer}>
                        <TextInput style = {workOrderPage.textOnWhite}
                            placeholder = 'title'
                            onChangeText = {this.handleTitle}/>
                    </View>
                </View>

                <View style={workOrderPage.rowContainer}>
                    <View style={workOrderPage.individualContainer}>
                        <Text style={workOrderPage.textOnBlue}>Cause</Text>
                    </View>
                    <View style={workOrderPage.individualContainer}>
                        <TextInput style={workOrderPage.textOnWhite}
                            placeholder = 'cause'
                            onChangeText = {this.handleCause}/>
                    </View>
                </View>
                
                <View style={workOrderPage.rowContainer}>
                    <View style={workOrderPage.individualContainer}>
                        <Text style={workOrderPage.textOnBlue}>Service needed?</Text>
                    </View>
                    <View style={workOrderPage.individualContainer}>
                        <Switch 
                            style={{alignSelf:'center'}}
                            onValueChange = {this.toggleServiceNeeded}
                            value = {this.state.service_needed}/>
                    </View>
                </View>

                <View style={workOrderPage.rowContainer}>
                    <View style={workOrderPage.individualContainer}>
                        <Text style={workOrderPage.textOnBlue}>Urgency</Text>
                    </View>
                    <View style={workOrderPage.individualContainer}>
                        <View style={workOrderPage.textOnWhite}>  
                        <RNPickerSelect value = {this.state.priority} style={workOrderPage.pickerComponent} onValueChange = {this.handlePriority}
                            items={[
                                { label: 'LOW', value: 'LOW' },
                                { label: 'MEDIUM', value: 'MEDIUM' },
                                { label: 'HIGH', value: 'HIGH' }
                            ]}
                        />
                        </View>    
                    </View>
                </View>
                
                <View style={workOrderPage.rowContainer}>
                    <TextInput  
                        style={workOrderPage.notesInput}
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

const mapStateToProps = state => ({
    user: state.user,
    property: state.property
});

export default connect(mapStateToProps, null)(WorkOrderPage);