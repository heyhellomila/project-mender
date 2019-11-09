import React from 'react';
import { View, Modal, Text, TextInput, Switch, Button } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent } from '../components/ButtonComponent';

class WorkOrderModal extends React.Component {
    static navigationOptions = {
        title: 'Create Work Order',
    };

    state={
        isVisible: true
    };
    render() {
        return (
            //buttonFunction={() => this.props.navigation.goBack(null)
            <Modal transparent={true}
            visible={this.state.isVisible}
            onRequestClose={this.closeModal}>
                    
                    <View style={styles.elementsContainer}>
                        <Button 
                        style={{alignSelf:'flex-end', position:'absolute'}}
                        title="close"
                        onPress ={() => this.props.navigation.goBack(null)}/>
                    <Text style={styles.headerStyle}>Work Order</Text>
                    <Text style={{fontSize:13, alignSelf:'center'}}>Property Number and Property Adress</Text>
                        <View style={{flexDirection:'row', alignSelf: 'center'}}>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#a3a3a3', borderRadius:5}}>Corrective</Text>
                            </View>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#a3a3a3', borderRadius:5}}>Preventive</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', alignSelf: 'center'}}>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#00ace6', borderRadius:5}}>Sector</Text>
                            </View>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#ffffff', borderRadius:5}}>Item picker goes here </Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', alignSelf: 'center'}}>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#00ace6', borderRadius:5}}>Title</Text>
                            </View>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <TextInput style={{textAlign:'center', backgroundColor: '#ffffff', borderRadius:5}}/>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', alignSelf: 'center'}}>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#00ace6', borderRadius:5}}>Cause</Text>
                            </View>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <TextInput style={{textAlign:'center', backgroundColor: '#ffffff', borderRadius:5}}/>
                            </View>
                        </View>
                        
                        <View style={{flexDirection:'row', alignSelf: 'center'}}>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#00ace6', borderRadius:5}}>Service needed?</Text>
                            </View>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Switch style={{alignSelf:'center'}}/>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', alignSelf: 'center'}}>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Text style={{textAlign:'center', backgroundColor: '#00ace6', borderRadius:5}}>Urgent?</Text>
                            </View>
                            <View style={{width: 100, height: 50, justifyContent:'center'}}>
                                <Switch style={{alignSelf:'center'}}/>
                            </View>
                        </View>

                        <TextInput  
                        style={{width:200, height: 150, backgroundColor: '#ffffff', alignSelf: 'center', borderRadius:5}}
                        placeholder="Notes/additional information"/>

                    </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(WorkOrderModal);

const styles = {
    headerStyle: {
      fontSize: 24,
      textAlign: 'center',
      fontWeight: '100',
      marginTop: 48,
      marginBottom: 24
    },
    elementsContainer: {
      flex: 1,
      backgroundColor: '#ecf5fd',
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
      marginTop: 24
    }
  
}