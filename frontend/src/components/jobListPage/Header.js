import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { jobListStyles, headerStyles, buttonStyles, circleStyles } from '../../stylesheets/JobListPageStyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import BookmarkedFilterComponent from './filterModals/BookmarkedFilterComponent'
import DueDateFilterComponent from './filterModals/DueDateFilterComponent'
import PriorityFilterComponent from './filterModals/PriorityFilterComponent'
import SectorFilterComponent from './filterModals/SectorFilterComponent'
import TypeFilterComponent from './filterModals/TypeFilterComponent'
import StatusFilterComponent from './filterModals/StatusFilterComponent';

const sort = require('../../../assets/Front_arrow.png');

const Header = (props) => {
    return (
        <View>
            <ScrollView style={headerStyles.jobListHeader} horizontal={true} showsHorizontalScrollIndicator={false}>
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
                    buttonStyle={props.filterBookmarked === '' ? buttonStyles.jobListFilterButton : buttonStyles.jobListFilterButtonSelected}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                    onPress={props.toggleBookmarkedModal}
                />
                <BookmarkedFilterComponent {...props} />
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
                    buttonStyle={props.filterDueDate === 'All' ? buttonStyles.jobListFilterButton : buttonStyles.jobListFilterButtonSelected}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                    onPress={props.toggleDueDateModal}
                /> 
                <DueDateFilterComponent {...props} />
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
                    buttonStyle={props.filterPriority === '' ? buttonStyles.jobListFilterButton : buttonStyles.jobListFilterButtonSelected}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                    onPress={props.togglePriorityModal}
                />
                <PriorityFilterComponent {...props} />
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
                    buttonStyle={props.filterSector === '' ? buttonStyles.jobListFilterButton : buttonStyles.jobListFilterButtonSelected}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                    onPress={props.toggleSectorModal}
                />
                <SectorFilterComponent {...props} />
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
                    buttonStyle={props.filterType === '' ? buttonStyles.jobListFilterButton : buttonStyles.jobListFilterButtonSelected}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                    onPress={props.toggleTypeModal}
                />  
                <TypeFilterComponent {...props} />
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
                    buttonStyle={props.filterStatus === '' ? buttonStyles.jobListFilterButton : buttonStyles.jobListFilterButtonSelected}
                    titleStyle={buttonStyles.jobListFilterButtonTitle}
                    onPress={props.toggleStatusModal}
                />  
                <StatusFilterComponent {...props} />
            </ScrollView>
            <View style={headerStyles.jobListSort}>
                <View style={jobListStyles.column}>
                    <View style={jobListStyles.row}>
                        <ModalDropdown 
                            defaultValue={'Sort by Work Order #'}
                            options={[
                                'Sort by Work Order #', 
                                'Sort by Due Date', 
                                'Sort by Priority', 
                                'Sort by Sector',
                                'Sort by Type',
                                'Sort by Status'
                            ]}
                            style={headerStyles.jobListDropdown}
                            animated={true}
                            showsVerticalScrollIndicator={false}
                            onSelect={(index, value) => props.handleSort(index, value)}
                        />
                        <TouchableOpacity style={jobListStyles.container}>
                            <Button
                                icon={
                                    <Image
                                        source={sort}
                                        style={
                                            props.sortIcon === 'up'
                                                ? headerStyles.sortIconUp
                                                : headerStyles.sortIconDown
                                        }
                                    />
                                }
                                type='clear'
                                onPress={props.handleOrdering}
                            /> 
                        </TouchableOpacity>
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