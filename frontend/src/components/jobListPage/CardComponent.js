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
                                        <View
                                            style={
                                                props.priority === 'HIGH'
                                                ? circleStyles.redCircle
                                                : props.priority === 'MEDIUM'
                                                    ? circleStyles.yellowCircle
                                                    : circleStyles.greenCircle
                                            }
                                        />
                                        <Text>{props.type === 'CM' ? 'Corrective' : 'Preventive'}</Text>
                                        <Text># {props.id}</Text>
                                    </View>
                                    <View style={jobListCardStyles.collapseHeaderSectionSecondLine}>
                                        <View style={jobListStyles.row}>
                                            <Text style={PixelRatio.get() < 2 ? jobListStyles.textRatio : jobListStyles.text}>{props.sectorType.replace(/_/g, ' ')}</Text>
                                            <TouchableOpacity style={jobListStyles.container}>
                                                <Image
                                                    style={jobListCardStyles.arrowIcon}
                                                    source={arrow}
                                                />
                                            </TouchableOpacity>
                                            <Text style={PixelRatio.get() < 2 ? jobListStyles.textRatio : jobListStyles.text}>{props.sectorKind.replace(/_/g, ' ')}</Text>
                                        </View>
                                        <Text style={PixelRatio.get() < 2 ? jobListStyles.textRatio : jobListStyles.text}>Status: Quote accepted</Text>
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
                                <Text style={jobListCardStyles.collapseBodySectionRight}>{props.cause}</Text>
                            </View>
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Location:</Text>
                                <Text style={jobListCardStyles.collapseBodySectionRight}>Upper floor bathroom</Text>
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
                                    disabled={true}
                                    disabledStyle={buttonStyles.completedButton}
                                    titleStyle={buttonStyles.buttonTitle}
                                />
                                <Button
                                    title='Edit'
                                    type='outline'
                                    buttonStyle={buttonStyles.editButton}
                                    titleStyle={buttonStyles.buttonTitle}
                                />
                                <Button
                                    title='Remove'
                                    type='outline'
                                    buttonStyle={buttonStyles.removeButton}
                                    titleStyle={buttonStyles.buttonTitle}
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