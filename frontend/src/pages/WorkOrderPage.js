import React from 'react';
import { View, Modal, Text, TextInput, Switch, Button } from 'react-native';
import { connect } from 'react-redux';

class WorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isVisible: true,
            isServiceNeeded: false,
            isUrgent: false
        }
    }
    static navigationOptions = {
        title: 'Create Work Order',
    };
    
    
    render() {
        return (
            //buttonFunction={() => this.props.navigation.goBack(null)
            <View style={styles.elementsContainer}>
                <Button 
                style={{alignSelf:'flex-end', position:'absolute'}}
                title="close"
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
                        <Text style={styles.textOnWhite}>Item picker goes here </Text>
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
                style={{width:200, height: 150, backgroundColor: '#ffffff', alignSelf: 'center', borderRadius:5}}
                placeholder="Notes/additional information"/>

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
      fontSize: 24,
      textAlign: 'center',
      fontWeight: '100',
      marginTop: 48,
      marginBottom: 24
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
        alignSelf: 'center'
    },
    individualContainer: {
        width: 100, 
        height: 50, 
        justifyContent: 'center'
    },
    selectedGray:{
        textAlign: 'center', 
        backgroundColor: '#a3a3a3', 
        borderRadius: 5
    },
    unselectedGray:{
        textAlign: 'center', 
        backgroundColor: '#cccccc', 
        borderRadius: 5
    },
    textOnBlue:{
        textAlign: 'center', 
        backgroundColor: '#00ace6', 
        borderRadius: 5
    },
    textOnWhite:{
        textAlign: 'center', 
        backgroundColor: '#ffffff', 
        borderRadius: 5
    }
    
}