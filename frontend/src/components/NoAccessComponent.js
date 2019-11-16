import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { noAccessComponent } from '../stylesheets/NoAccessComponent';

const NoAccessComponent = (props) => {
    return (
        <View style={noAccessComponent.container}>
            <View style={noAccessComponent.rowContainer}>
                <Text style={noAccessComponent.text}>
                    {props.errorMessage}
                </Text>
            </View>
            <View style={noAccessComponent.rowContainer}>
                <Button
                    style={noAccessComponent.button}
                    title="Go back"
                    onPress={() => props.navigation.goBack()}/>
            </View>
        </View>
    );
};

export default NoAccessComponent;