import React from 'react';
import { Image, Text, TouchableOpacity, View, PixelRatio } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { jobListStyles, jobListCardStyles, buttonStyles, circleStyles } from '../../stylesheets/JobListPageStyleSheet';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import ToggleSwitch from 'toggle-switch-react-native';

const arrow = require('../../../assets/Front_arrow.png');

const CardComponent = (props) => {
    return (
        <View>
            <Card containerStyle={jobListCardStyles.workOrderCard}>
                <Collapse>
                    <CollapseHeader> 
                        <Card containerStyle={jobListCardStyles.jobListCardContainer}>
                            <View style={jobListCardStyles.topDetails}>
                                <View style={jobListCardStyles.calendar}>
                                    <Icon 
                                        name='calendar'
                                        size={25}
                                        color='black'
                                    />  
                                    <Text style={jobListCardStyles.dueDate}>{moment(props.dueDate).format("MMM D")}</Text>
                                </View>
                                <View style={jobListCardStyles.collapseHeaderSection}>
                                    <View style={jobListCardStyles.collapseHeaderSectionFirstLine}>
                                        <Text style={jobListCardStyles.title}>{props.title}</Text>
                                        <Text style={jobListStyles.text}>{props.type === 'CM' ? 'Corrective' : 'Preventive'}</Text>
                                        <Text style={jobListStyles.text}># {props.id}</Text>
                                    </View>
                                    <View style={jobListCardStyles.collapseHeaderSectionLine}>
                                        <View style={jobListStyles.row}>
                                            <Text style={PixelRatio.get() < 3 ? jobListStyles.textRatio : jobListStyles.text}>{props.sectorType.replace(/_/g, ' ')}</Text>
                                            <TouchableOpacity style={jobListStyles.container}>
                                                <Image
                                                    style={jobListCardStyles.arrowIcon}
                                                    source={arrow}
                                                />
                                            </TouchableOpacity>
                                            <Text style={PixelRatio.get() < 3 ? jobListStyles.textRatio : jobListStyles.text}>{props.sectorKind.replace(/_/g, ' ')}</Text>
                                        </View>
                                    </View>
                                    <View style={jobListCardStyles.collapseHeaderSectionLine}>
                                        <Text style={PixelRatio.get() < 3 ? jobListStyles.textRatio : jobListStyles.text}>Status: {props.status.replace(/_/g, ' ')}</Text>
                                        <View
                                            style={
                                                props.priority === 'HIGH'
                                                ? circleStyles.redCircle
                                                : props.priority === 'MEDIUM'
                                                    ? circleStyles.yellowCircle
                                                    : circleStyles.greenCircle
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </CollapseHeader>
                    <CollapseBody style={jobListCardStyles.collapseBodySection}>
                        <Card containerStyle={jobListCardStyles.jobListCardContainer}> 
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.dateCreated}>Date created:</Text>
                                <Text style={jobListCardStyles.date}>{moment(props.createdDate).format("MMMM Do YYYY")}</Text>
                            </View>
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Notification:</Text>
                                <Text style={jobListCardStyles.collapseBodySectionRight}>{props.notification}</Text>
                            </View>
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Cause:</Text>
                                <Text style={jobListCardStyles.collapseBodySectionRight}>{props.cause === null ? 'N/A' : props.cause}</Text>
                            </View>
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Location:</Text>
                                <Text style={jobListCardStyles.collapseBodySectionRight}>{props.location === null ? 'N/A' : props.location}</Text>
                            </View> 
                            <View style={jobListCardStyles.collapseBodySectionBottom}>
                                <View style={jobListCardStyles.serviceNeeded}>
                                    <Text style={jobListCardStyles.serviceNeededText}>Service needed: {props.serviceNeeded}</Text>
                                    <ToggleSwitch
                                        isOn={props.serviceNeeded === true
                                            ? true
                                            : false
                                        }
                                        onColor='#42d553'
                                        size='small'
                                        onToggle={isOn => console.log(isOn)}
                                        disabled={true}
                                    />
                                </View>
                            </View>
                            <View style={jobListCardStyles.collapseBodySectionBottom}>
                                <Text style={jobListStyles.text}>Quotes received: 1</Text>
                                    <Button
                                        title='View quotes'
                                        type='outline'
                                        buttonStyle={buttonStyles.viewQuotesButton}
                                        titleStyle={buttonStyles.buttonTitle}
                                    />
                            </View>
                            <View style={jobListCardStyles.photoSection}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Photos:</Text>
                                <Button
                                    icon={
                                        <Icon
                                            name='camera'
                                            size={15}
                                            color='black'
                                        />
                                    }
                                    title='Add photo'
                                    type='clear'
                                    titleStyle={buttonStyles.buttonTitle}
                                />
                            </View>
                            <View style={jobListCardStyles.separator}/>
                            <View style={jobListCardStyles.collapseBodySectionBottomButtons}>
                                <Button
                                    title='Completed'
                                    type='outline'
                                    disabled={false}
                                    buttonStyle={buttonStyles.completedButton}
                                    disabledStyle={buttonStyles.completedButton}
                                    titleStyle={buttonStyles.buttonTitle}
                                    onPress={() => props.completeWorkOrder(props.id)}
                                />
                                <Button
                                    title='Edit'
                                    type='outline'
                                    buttonStyle={buttonStyles.editButton}
                                    titleStyle={buttonStyles.buttonTitle}
                                    onPress={() => props.navigation.navigate('EditWorkOrder', props)}
                                />
                                <Button
                                    title='Remove'
                                    type='outline'
                                    buttonStyle={buttonStyles.removeButton}
                                    titleStyle={buttonStyles.buttonTitle}
                                    onPress={() => props.deleteWorkOrder(props.id)}
                                />
                            </View>
                        </Card> 
                    </CollapseBody>
                </Collapse>
            </Card>
        </View>
    );
};

export default CardComponent;