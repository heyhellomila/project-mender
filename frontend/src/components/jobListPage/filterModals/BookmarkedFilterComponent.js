import React from 'react';
import { Text, View, StatusBar, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { filterStyles } from '../../../stylesheets/JobListPageStyleSheet';

const BookmarkedFilterComponent = (props) => {
    return (
        <Modal 
            isVisible={props.isBookmarkedModalVisible}
            backdropColor={'white'}
            animationInTiming={0}
            animationOutTiming={100}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            backdropOpacity={1}
            style={filterStyles.modal}
        >
            <StatusBar hidden={true} />
            <View style={filterStyles.filterView}>
                <View style={filterStyles.header}>
                    <View style={filterStyles.column}>
                        <Text style={filterStyles.filterTitle}>Filter</Text>
                    </View>
                    <View style={filterStyles.column}>
                        <Button
                            title='Cancel'
                            onPress={props.handleCancelBookmarkedFilter}
                            buttonStyle={filterStyles.cancelButton}
                            titleStyle={filterStyles.cancelButtonTitle}
                        />
                    </View>
                </View>
                <View style={filterStyles.separator} />
                <View style={filterStyles.filterContainerBookmarked}>
                    <View style={filterStyles.column}>
                        <Text style={filterStyles.filterText}>Bookmarked</Text>
                    </View>
                    <View style={filterStyles.column}>
                        <Switch
                            onValueChange = {(value) => props.toggleBookmarkedSwitch(value)}
                            value = {props.filterSwitch}   
                        />
                    </View> 
                </View>
            </View>
            <View style={filterStyles.applyContainer}>
                <Button 
                    title='Apply' 
                    onPress={props.handleApplyBookmarkedFilter}
                    buttonStyle={filterStyles.applyButton}
                    raised={true}
                />
            </View>
        </Modal>
    );
};

export default BookmarkedFilterComponent;
