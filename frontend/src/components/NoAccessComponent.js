import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { noAccessComponent } from '../stylesheets/NoAccessComponent';

const NoAccessComponent = (props) => {
    return (
        <View style={noAccessComponent.container}>
            <Text style={noAccessComponent.text}>
                {props.errorMessage}
            </Text>
            <Button
                style={noAccessComponent.button}
                title="Go back"
                onPress={() => {props.navigation.goBack()}}/>
        </View>
    );
};

export default NoAccessComponent;