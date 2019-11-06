import React from 'react';
import { View, Button } from 'react-native';

const WorkOrderModal = ({navigation}) => (
    <View>
        <Button
            title="Close modal"
            onPress={() => navigation.goBack(null)}
        />
    </View>
);

export default WorkOrderModal;