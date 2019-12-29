import React from 'react';
import { ActivityIndicator, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { jobListStyles, headerStyles, buttonStyles, circleStyles } from '../../stylesheets/JobListPageStyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';

const Header = (props) => {
    return (
        <View>
            <ScrollView style={headerStyles.jobListHeader} horizontal={true}>
                <Button
                    icon={
                        <Icon
                            name='bookmark'
                            size={15}
                            color='black'
                        />
                    }
                    title='Bookmarked'
                    type='outline'
                    containerStyle={buttonStyles.jobListFilterButtonContainer}
                    buttonStyle={buttonStyles.jobListFilterButton}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                />
                <Button
                    icon={
                        <Icon
                            name='calendar'
                            size={15}
                            color='black'
                        />
                    }
                    title='Due Date'
                    type='outline'
                    containerStyle={buttonStyles.jobListFilterButtonContainer}
                    buttonStyle={buttonStyles.jobListFilterButton}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                /> 
                <Button
                    icon={
                        <Icon
                            name='list'
                            size={15}
                            color='black'
                        />
                    }
                    title='Priority'
                    type='outline'
                    containerStyle={buttonStyles.jobListFilterButtonContainer}
                    buttonStyle={buttonStyles.jobListFilterButton}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                />
                <Button
                    icon={
                        <Icon
                            name='plug'
                            size={15}
                            color='black'
                        />
                    }
                    title='Sector'
                    type='outline'
                    containerStyle={buttonStyles.jobListFilterButtonContainer}
                    buttonStyle={buttonStyles.jobListFilterButton}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                />
                <Button
                    icon={
                        <Icon
                            name='wrench'
                            size={15}
                            color='black'
                        />
                    }
                    title='Type'
                    type='outline'
                    containerStyle={buttonStyles.jobListFilterButtonContainer}
                    buttonStyle={buttonStyles.jobListFilterButton}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                />  
                <Button
                    icon={
                        <Icon
                            name='check-circle'
                            size={15}
                            color='black' 
                        />
                    }
                    title='Status'
                    type='outline'
                    containerStyle={buttonStyles.jobListFilterButtonContainer}
                    buttonStyle={buttonStyles.jobListFilterButton}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                />  
            </ScrollView>
            <View style={headerStyles.jobListSort}>
                <View style={jobListStyles.column}>
                    <View style={jobListStyles.row}>
                        <ModalDropdown 
                            defaultValue='Sort by Work Order #'
                            options={[
                                'Sort by Work Order #', 
                                'Sort by Due Date', 
                                'Sort by Priority', 
                                'Sort by Sector Type',
                                'Sort by Sector Kind', 
                                'Sort by Type',
                                'Sort by Status'
                            ]}
                            style={headerStyles.jobListDropdown}
                            animated={true}
                            onSelect={props.handleSort}
                        />
                        <Button
                            icon={
                                <Icon
                                    name={props.sortIcon}
                                    size={20}
                                    color='black'
                                />
                            }
                            type='clear'
                            onPress={props.handleOrdering}
                        /> 
                    </View>
                </View>
                <View style={headerStyles.prioritySection}>
                    <View style={headerStyles.priorities}>
                        <View style={circleStyles.redCircle}/> 
                        <Text style={headerStyles.priorityText}>High</Text>
                        <View style={circleStyles.yellowCircle}/> 
                        <Text style={headerStyles.priorityText}>Medium</Text>
                        <View style={circleStyles.greenCircle}/> 
                        <Text style={headerStyles.priorityText}>Low</Text>
                    </View>
                </View>
            </View>
            <View style={headerStyles.loadingContainer}>
                {
                    props.loading === true && props.showSortIndicator === true
                        ? <ActivityIndicator animating size={'small'} style={{height: 25}} />
                        : null
                }
            </View>
        </View>
    );
};

export default Header;