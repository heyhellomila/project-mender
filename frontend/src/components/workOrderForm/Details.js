import {datePickerStyles, formStyles, circleStyles} from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import {View, Text, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import { useColorScheme } from 'react-native-appearance';
import moment from "moment";
import {isInAMonth, isInAYear, isToday} from "../../utils/DateUtils";

const minDate = new Date();
const maxDate = new Date(minDate.getFullYear() + 5, minDate.getMonth(), minDate.getDate());

const Details = (props) => {
    return (
        <View style={formStyles.detailsContainer}>
            <View style={[formStyles.rowContainer, formStyles.toggleInputGroup]}>
                <View style={formStyles.detailsInfoHeaderContainer}>
                    <Text style={formStyles.infoHeader}>Emergency</Text>
                </View>
                <View style={formStyles.colContainer}>
                    <Switch
                        style={formStyles.switchStyle}
                        onValueChange = {(value) => props.toggleEmergency(value)}
                        value = {props.emergency}/>
                </View>
            </View>
            <View style={[formStyles.rowContainer, formStyles.toggleInputGroup]}>
                <View style={formStyles.detailsInfoHeaderContainer}>
                    <Text style={formStyles.infoHeader}>Service Needed</Text>
                </View>
                <View style={formStyles.colContainer}>
                    <Switch
                        style={formStyles.switchStyle}
                        onValueChange = {(value) => props.toggleServiceNeeded(value)}
                        value = {props.serviceNeeded}/>
                </View>
            </View>
            <View style={[formStyles.colContainer, formStyles.priorityInputGroup]}>
                <View style={[formStyles.rowContainer, {flex: 0.6}]}>
                    <View style={formStyles.detailsInfoHeaderContainer}>
                        <Text style={formStyles.infoHeader}>Priority</Text>
                    </View>
                </View>
                <View style={[formStyles.rowContainer, formStyles.priorityList]}>
                    <View style={formStyles.colContainer}>
                        <TouchableOpacity onPress={() => props.handlePriority('HIGH')}
                            style={circleStyles.container}>
                            <View style={props.priority === 'HIGH'
                                ? circleStyles.selected
                                : circleStyles.unselected}>
                                <View style={circleStyles.redCircle}/>
                            </View>
                            <Text>Priority 1</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={formStyles.colContainer}>
                        <TouchableOpacity onPress={() => props.handlePriority('MEDIUM')}
                            style={circleStyles.container}>
                            <View style={props.priority === 'MEDIUM'
                                ? circleStyles.selected
                                : circleStyles.unselected}>
                                <View style={circleStyles.yellowCircle}/>
                            </View>
                            <Text>Priority 2</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={formStyles.colContainer}>
                        <TouchableOpacity onPress={() => props.handlePriority('LOW')}
                            style={circleStyles.container}>
                            <View style={props.priority === 'LOW'
                                ? circleStyles.selected
                                : circleStyles.unselected}>
                                <View style={circleStyles.greenCircle}/>
                            </View>
                            <Text>Priority 3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={formStyles.colContainer}>
                <View style={[formStyles.rowContainer, formStyles.dueDateInputGroup]}>
                    <View style={formStyles.detailsInfoHeaderContainer}>
                        <Text style={formStyles.infoHeader}>Due Date</Text>
                    </View>
                </View>
                <View style={formStyles.colContainer}>
                    <View style={[formStyles.rowContainer, formStyles.dueDateOptions]}>
                        <TouchableOpacity style={[formStyles.dateOptionContainer,
                            isToday(props.dueDate) && formStyles.selectedDateOption]}
                            onPress={() => props.handleDueDate(new Date())}>
                            <Text style={formStyles.dateOptionText}>Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[formStyles.dateOptionContainer,
                            isInAMonth(props.dueDate) && formStyles.selectedDateOption]}
                            onPress={() => props.handleDueDate(new Date(minDate.getFullYear(), minDate.getMonth() + 1, minDate.getDate()))}>
                            <Text style={formStyles.dateOptionText}>In 1 month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[formStyles.dateOptionContainer,
                            isInAYear(props.dueDate) && formStyles.selectedDateOption]}
                            onPress={() => props.handleDueDate(new Date(minDate.getFullYear() + 1, minDate.getMonth(), minDate.getDate()))}>
                        <Text style={formStyles.dateOptionText}>In 1 year</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[formStyles.rowContainer]}>
                        <DatePicker
                            style={datePickerStyles.style}
                            date={props.dueDate}
                            mode='date'
                            format={props.dateFormat}
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
                            onDateChange={(date) =>
                                props.handleDueDate(moment(date, props.dateFormat, true).toDate())}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Details;
