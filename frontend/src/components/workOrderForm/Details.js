import { formStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput, Switch, Picker} from 'react-native';
import ModalSelector from 'react-native-modal-selector'

import React from 'react';

const Details = (props) => {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 2}}>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Service Needed?</Text>
                    <View style={formStyles.colContainer}>
                        <Switch  
                            style={formStyles.switchStyle}
                            onValueChange = {(value) => props.toggleServiceNeeded(value)}
                            value = {props.serviceNeeded}/>
                    </View>
                </View>

                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Urgency</Text>
                    <View style={formStyles.colContainer}>
                        <ModalSelector
                            data={[
                                {key: 0, label: 'LOW'},
                                {key: 1, label: 'MEDIUM'},
                                {key: 2, label: 'HIGH'}
                            ]}
                            initValue={props.priority}
                            initValueTextStyle={{color: 'black'}}
                            onChange={(option) => props.handlePriority(option.label)}
                            childrenContainerStyle	={formStyles.pickerStyle}/>
                            {/* <Picker 
                            mode='dropdown'
                            style={formStyles.pickerStyle}
                            selectedValue = {props.priority}
                            onValueChange = {(value, index) => props.handlePriority(value)}
                        >
                            <Picker.Item label="LOW" value="LOW"/> 
                            <Picker.Item label="MEDIUM" value="MEDIUM"/> 
                            <Picker.Item label="HIGH" value="HIGH"/> 
                        </Picker> */}
                    </View>
                </View>
            </View>
            <View style={{flex : 2}}>
                <View style={formStyles.rowContainer}>
                    <TextInput  
                        multiline={true}
                        style={formStyles.notesInput}
                        defaultValue = {props.description}
                        placeholder = 'Notes/additional information'
                        onChangeText = {(value) => props.handleDescription(value)}/>
                </View>
            </View>
        </View>
    );
};

export default Details;
