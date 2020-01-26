import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';
import { filterStyles } from '../../../stylesheets/JobListPageStyleSheet';
 
const SectorFilterComponent = (props) => {
    return (
        <Modal 
            isVisible={props.isSectorModalVisible}
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
                            onPress={props.handleCancelSectorFilter}
                            buttonStyle={filterStyles.cancelButton}
                            titleStyle={filterStyles.cancelButtonTitle}
                        />
                    </View>
                </View>
                <View style={filterStyles.separator} />
                <View style={filterStyles.filterContainer}>
                    <View style={filterStyles.row}>
                        <Text style={filterStyles.filterText}>Sector</Text>
                    </View>
                    <View style={filterStyles.row}>
                        <RadioForm
                            radio_props={props.sectorOptions}
                            initial={props.filterSectorOptionValue}
                            onPress={(value) => props.toggleSectorOption(value)}
                        />
                    </View>
                </View>
            </View>
            <View style={filterStyles.applyContainer}>
                <Button 
                    title='Apply' 
                    onPress={props.handleApplySectorFilter}
                    buttonStyle={filterStyles.applyButton}
                    raised={true}
                />
            </View>
        </Modal>
    );
};

export default SectorFilterComponent;
