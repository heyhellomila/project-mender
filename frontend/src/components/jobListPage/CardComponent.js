import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { jobListStyles, jobListCardStyles, buttonStyles, circleStyles } from '../../stylesheets/JobListPageStyleSheet';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import ToggleSwitch from 'toggle-switch-react-native';

const CardComponent = (props) => {
    return (
        <View>
            <Card containerStyle={jobListCardStyles.workOrderCard}>
                <Collapse>
                    <CollapseHeader> 
                        <Card containerStyle={jobListCardStyles.jobListCardContainer}>
                            <View style={jobListCardStyles.topDetails}>
                                <View style={jobListCardStyles.calendar}>
                                    <Icon name='calendar'
                                            size={25}
                                            color='black'>
                                    </Icon>  
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
                                        <Text style={jobListStyles.text}>Utilities -> Plumbing</Text>
                                        <Text style={jobListStyles.text}>Status: Quote accepted</Text>
                                    </View>
                                    </View>
                            </View>
                        </Card>
                    </CollapseHeader>
                    <CollapseBody style={jobListCardStyles.collapseBodySection}>
                        <Card containerStyle={jobListCardStyles.jobListCardContainer}> 
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.dateCreated}>Date created:</Text>
                                <Text style={jobListCardStyles.date}>December 23rd, 2019</Text>
                            </View>
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Notification:</Text>
                                <Text style={jobListCardStyles.collapseBodySectionRight}>I noticed a small leak on the first connection on the drain pipe under the sink.</Text>
                            </View>
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Cause:</Text>
                                <Text style={jobListCardStyles.collapseBodySectionRight}>Normal wear</Text>
                            </View>
                            <View style={jobListStyles.row}>
                                <Text style={jobListCardStyles.collapseBodySectionLeft}>Location:</Text>
                                <Text style={jobListCardStyles.collapseBodySectionRight}>Upper floor bathroom</Text>
                            </View> 
                            <View style={jobListCardStyles.collapseBodySectionBottom}>
                                <View style={jobListCardStyles.serviceNeeded}>
                                    <Text style={jobListCardStyles.serviceNeededText}>Service needed:</Text>
                                    <ToggleSwitch
                                        isOn={true}
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