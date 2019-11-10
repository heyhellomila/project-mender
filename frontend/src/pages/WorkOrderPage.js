import React from 'react';
import { View, Picker, Text, TextInput, Switch, Button, KeyboardAvoidingView } from 'react-native';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder'
import { connect } from 'react-redux';
import { workOrderPage } from '../stylesheets/WorkOrderPageStyleSheet'

class WorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            property_id: '5db9ee23349a0b4244e7693a',
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
                this.state.price_estimate).then(async (response) => {
                    await this.props.authenticate(response.data.token).then(() => {
                        if (!this.props.user.loading && this.props.user.user) {
                        this.props.navigation.goBack(null)
                        }
                    })
                    });
        } catch (err) {

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
                        <Picker selectedValue = {this.state.sector} style={workOrderPage.pickerComponent} onValueChange = {this.handleSector}>
                            <Picker.Item label='Roof' value='ROOF' />
                            <Picker.Item label='Kitchen' value='KITCHEN' />
                            <Picker.Item label='Utilities' value='UTILITIES' />
                            <Picker.Item label='Living Room' value='LIVINGROOM' />
                            <Picker.Item label='Bathroom' value='BATHROOM' />
                            <Picker.Item label='Appliances' value='APPLIANCES' />
                            <Picker.Item label='Bedroom' value='BEDROOM' />
                            <Picker.Item label='Balcony' value='BALCONY' />
                            <Picker.Item label='Garage' value='GARAGE' />
                            <Picker.Item label='Envelope' value='ENVELOPE' />
                            <Picker.Item label='Electrical' value='ELECTRICAL' />
                            <Picker.Item label='HVAC' value='HVAC' />
                            <Picker.Item label='other' value='OTHER' />
                        </Picker>
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
                        style={{alignSelsf:'center'}}
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
                        <Picker selectedValue = {this.state.priority} onValueChange = {this.handlePriority}>
                            <Picker.Item label='LOW' value='LOW' />
                            <Picker.Item label='MEDIUM' value='MEDIUM' />
                            <Picker.Item label='HIGH' value='HIGH' />
                        </Picker>
                        </View>    
                    </View>
                </View>

                <TextInput  
                    style={{width:230, height: 100, backgroundColor: '#ffffff', alignSelf: 'center', borderRadius:5}}
                    placeholder = 'Notes/additional information'
                    onChangeText = {this.handleDescription}/>
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
});

export default connect(mapStateToProps, null)(WorkOrderPage);