import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';
 
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
            style={{justifyContent: 'flex-end', margin: 0}}
        >
            <StatusBar hidden={true} />
            <View style={{flex: 1, flexDirection: 'column', marginTop: 25}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                    <Button
                        title='Cancel'
                        onPress={props.handleCancelSectorFilter}
                    />
                    <Text>Filter</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                    <View style={{aligntItems: 'center', justifyContent: 'center'}}>
                        <Text>Sector</Text>
                        <RadioForm
                            radio_props={props.sectorOptions}
                            initial={props.filterSectorOptionValue}
                            onPress={(value) => props.toggleSectorOption(value)}
                        />
                    </View> 
                </View>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
                <Button 
                    title='Apply' 
                    onPress={props.handleApplySectorFilter}
                    style={{borderRadius: 0, height: 100}}
                />
            </View>
        </Modal>
    );
};

export default SectorFilterComponent;
