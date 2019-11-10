import React from 'react';
import { View, Picker, Text, TextInput, Switch, Button } from 'react-native';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder'
import { connect } from 'react-redux';

class WorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            property_id: '',
            sector: '',
            type: '', 
            title: '', 
            cause: '', 
            service_needed: false, 
            priority: '', 
            description: '', 
            due_date: new Date().getDate() + 1, 
            price_estimate: 0
        }
    }
    static navigationOptions = {
        title: 'Create Work Order',
    };
    
    handleWorkOrder(){
        try {
                await createWorkOrder(
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
            alert('error');
        }
    }
    
    render() {
        return (
            //buttonFunction={() => this.props.navigation.goBack(null)
            <View style={styles.elementsContainer}>
                <Button 
                style={{alignSelf:'flex-end', position:'absolute', width: 100}}
                title='close'
                onPress ={() => this.props.navigation.goBack(null)}/>
            <Text style={styles.headerStyle}>Work Order</Text>
            <Text style={styles.subHeaderStyle}>Property Number and Property Adress</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.individualContainer}>
                        <Text style={styles.selectedGray}>Corrective</Text>
                    </View>
                    <View style={styles.individualContainer}>
                        <Text style={styles.unselectedGray}>Preventive</Text>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.individualContainer}>
                        <Text style={styles.textOnBlue}>Sector</Text>
                    </View>
                    <View style={styles.individualContainer}>
                        <View style={styles.textOnWhite}>  
                        <Picker>
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

                <View style={styles.rowContainer}>
                    <View style={styles.individualContainer}>
                        <Text style={styles.textOnBlue}>Title</Text>
                    </View>
                    <View style={styles.individualContainer}>
                        <TextInput style={styles.textOnWhite}/>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.individualContainer}>
                        <Text style={styles.textOnBlue}>Cause</Text>
                    </View>
                    <View style={styles.individualContainer}>
                        <TextInput style={styles.textOnWhite}/>
                    </View>
                </View>
                
                <View style={styles.rowContainer}>
                    <View style={styles.individualContainer}>
                        <Text style={styles.textOnBlue}>Service needed?</Text>
                    </View>
                    <View style={styles.individualContainer}>
                    <Switch 
                        style={{alignSelsf:'center'}}
                        value = {this.state.isServiceNeeded}/>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.individualContainer}>
                        <Text style={styles.textOnBlue}>Urgent?</Text>
                    </View>
                    <View style={styles.individualContainer}>
                    <Switch 
                        style={{alignSelsf:'center'}}
                        value = {this.state.isUrgent}
                        />
                    </View>
                </View>

                <TextInput  
                style={{width:230, height: 100, backgroundColor: '#ffffff', alignSelf: 'center', borderRadius:5}}
                placeholder='Notes/additional information'/>
                <Button 
                style={{alignSelf:'flex-end', position:'absolute', width: 100}}
                title='Done'
                onPress ={() => this.props.navigation.goBack(null)}/>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(WorkOrderPage);

const styles = {
    headerStyle: {
      fontSize: 36,
      textAlign: 'center',
      fontWeight: '100',
      marginTop: 24,
      marginBottom: 10
    },
    subHeaderStyle: {
        fontSize: 13, 
        alignSelf: 'center'
    },
    elementsContainer: {
      flex: 1,
      backgroundColor: '#ecf5fd',
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
      marginTop: 24
    },
    rowContainer: {
        flexDirection: 'row', 
        alignSelf: 'center',
        marginBottom: 20
    },
    individualContainer: {
        height: 50, 
        justifyContent: 'center'
    },
    selectedGray:{
        fontSize: 24,
        width: 120,
        textAlign: 'center', 
        backgroundColor: '#a3a3a3', 
        borderRadius: 5,
        marginRight: 30,
        marginLeft: 30
    },
    unselectedGray:{
        fontSize: 24,
        width: 120,
        textAlign: 'center', 
        backgroundColor: '#cccccc', 
        borderRadius: 5,
        marginRight: 40,
        marginLeft: 40
    },
    textOnBlue:{
        fontSize: 24,
        width: 130,
        textAlign: 'center', 
        backgroundColor: '#00ace6', 
        borderRadius: 5,
        marginRight: 15
    },
    textOnWhite:{
        fontSize: 24,
        width: 130,
        textAlign: 'center', 
        backgroundColor: '#ffffff', 
        borderRadius: 5,
        marginLeft: 15
    }
    
}