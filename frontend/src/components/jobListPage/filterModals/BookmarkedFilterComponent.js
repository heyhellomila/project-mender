import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

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
            style={{justifyContent: 'flex-end', margin: 0}}
        >
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 25}}>
                <Button
                    title='Cancel'
                    onPress={props.toggleBookmarkedModal}
                />
                <Text>Filter</Text>
                <Button
                    title='Reset'
                    onPress={props.toggleBookmarkedModal}
                />
            </View>
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <Text>NEW BOOKMARKED</Text>
            </View> 
            <View style={{justifyContent: 'flex-end'}}>
                <Button 
                    title='Apply' 
                    onPress={props.toggleBookmarkedModal}
                    style={{borderRadius: 0, height: 100}}
                />
            </View>
        </Modal>
    );
};

export default BookmarkedFilterComponent;
