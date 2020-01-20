import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const FilterModalComponent = (props) => {
    return (
        <Modal 
            isVisible={
                props.isBookmarkedModalVisible || 
                props.isDueDateModalVisible || 
                props.isPriorityModalVisible || 
                props.isSectorModalVisible || 
                props.isTypeModalVisble || 
                props.isStatusModalVisble
            }
            backdropColor={'white'}
            animationInTiming={0}
            animationOutTiming={0}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            backdropOpacity={1}
            style={{justifyContent: 'flex-end', margin: 0}}
        >
        {
            props.isBookmarkedModalVisible
                ?   <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                        <Text>bookmarked filter</Text>
                        <Button 
                            title='Save' 
                            onPress={props.toggleBookmarkedModal}
                        />
                    </View> 
                : props.isDueDateModalVisible
                    ?   <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                            <Text>duedate filter</Text>
                            <Button 
                                title='Save' 
                                onPress={props.toggleDueDateModal}
                            />
                        </View> 
                    : props.isPriorityModalVisible
                        ?   <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                                <Text>priority filter</Text>
                                <Button 
                                    title='Save' 
                                    onPress={props.togglePriorityModal}
                                />
                            </View> 
                        : props.isSectorModalVisible
                            ?   <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                                    <Text>sector filter</Text>
                                    <Button 
                                        title='Save' 
                                        onPress={props.toggleSectorModal}
                                    />
                                </View>
                            : props.isTypeModalVisible
                                ?   <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                                        <Text>type filter</Text>
                                        <Button 
                                            title='Save' 
                                            onPress={props.toggleTypeModal}
                                        />
                                    </View> 
                                :   <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                                        <Text>status filter</Text>
                                        <Button 
                                            title='Save' 
                                            onPress={props.toggleStatusModal}
                                        />
                                    </View>
        }
        </Modal>
    );
};

export default FilterModalComponent;
