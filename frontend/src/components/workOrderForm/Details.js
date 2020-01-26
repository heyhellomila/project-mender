import {datePickerStyles, formStyles} from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, TextInput, Switch } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import { useColorScheme } from 'react-native-appearance';

const minDate = new Date();
const maxDate = new Date(minDate.getFullYear() + 5, minDate.getMonth(), minDate.getDate());

const Details = (props) => {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 3}}>
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
                            childrenContainerStyle	={formStyles.pickerStyle}
                            overlayStyle={formStyles.pickerOverlayStyle}
                        />
                    </View>
                </View>
                <View style={formStyles.rowContainer}>
                    <Text style={formStyles.infoHeader}>Due Date</Text>
                    <View style={formStyles.colContainer}>
                        <DatePicker
                            style={datePickerStyles.style}
                            date={props.dueDate}
                            mode='date'
                            format='YYYY-MM-DD'
                            minDate={minDate}
                            maxDate={maxDate}
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: datePickerStyles.dateIcon,
                                dateInput: datePickerStyles.dateInput,
                                datePickerCon: useColorScheme() === 'dark'
                                    ? datePickerStyles.darkDatePickerCon
                                    : datePickerStyles.lightDatePickerCon
                            }}
                            onDateChange={(date) => {props.handleDueDate(date)}}
                        />
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
