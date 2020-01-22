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
            animationOutTiming={0}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            backdropOpacity={1}
            style={{justifyContent: 'flex-end', margin: 0}}
        >
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <Text>NEW BOOKMARKED</Text>
                <Button 
                    title='Save' 
                    onPress={props.toggleBookmarkedModal}
                />
            </View> 
        </Modal>
    );
};

export default BookmarkedFilterComponent;
