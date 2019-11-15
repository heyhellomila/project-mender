import { createWorkOrderComponent } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput, Switch, TouchableOpacity, Image, KeyboardAvoidingView, Picker} from 'react-native';
import  { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import Header from './Header';
const submit = require('../../../assets/Submit.png');
const status = require('../../../assets/Status.png');

const Details = (props) => {
    return (
        <KeyboardAwareScrollView scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{flex: 6, paddingHorizontal: '5%', backgroundColor: '#f0f0f0'}}>
            <View style={{flex: 1}}>
                <Header {...props} headerText={'Details'}></Header>
            </View>
            <View style={{flex: 4}}>
                <View style={{flex: 2}}>
                    <View style={createWorkOrderComponent.rowContainer}>
                        <Text style={createWorkOrderComponent.infoHeader}>Service Needed?</Text>
                        <View style={createWorkOrderComponent.colContainer}>
                            <Switch  
                                style={{alignSelf: 'center'}}
                                onValueChange = {(value) => props.toggleServiceNeeded(value)}
                                value = {props.serviceNeeded}/>
                        </View>
                    </View>

                    <View style={createWorkOrderComponent.rowContainer}>
                        <Text style={createWorkOrderComponent.infoHeader}>Urgency</Text>
                        <View style={createWorkOrderComponent.colContainer}>
                            <Picker 
                                mode='dropdown'
                                style={{width: '60%', alignSelf: 'center'}}
                                selectedValue = {props.priority}
                                onValueChange = {(value, index) => props.handlePriority(value)}
                            >
                                <Picker.Item label="LOW" value="LOW"/> 
                                <Picker.Item label="MEDIUM" value="MEDIUM"/> 
                                <Picker.Item label="HIGH" value="HIGH"/> 
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={{flex : 2}}>
                    <View style={createWorkOrderComponent.rowContainer}>
                        <TextInput  
                            multiline={true}
                            style={createWorkOrderComponent.notesInput}
                            defaultValue = {props.description}
                            placeholder = 'Notes/additional information'
                            onChangeText = {(value) => props.handleDescription(value)}/>
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
                        <TouchableOpacity disabled={props.submitting || props.success} style={createWorkOrderComponent.rightButton}
                            onPress={() => props.submit()}>
                            <Image style={props.success ? 
                                    {alignSelf:'flex-end', width: 50, height: 50, backgroundColor: '#17d402', borderRadius: 25}
                                    : {alignSelf:'flex-end', width: 50, height: 50}} source={submit}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Details;
