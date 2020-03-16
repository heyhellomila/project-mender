import React from 'react';
import { Text, View } from 'react-native';
import { headerStyles } from '../../stylesheets/DataAnalyticsStyleSheet'
import { ButtonGroup } from 'react-native-elements';
 
const Header = (props) => {
    return (
        <View style={headerStyles.header}>
            <Text style={headerStyles.headerTitle}>Overview</Text>
            <ButtonGroup 
                buttons={props.buttons}
                selectedIndex={props.selectedIndex}
                onPress={props.updateSelection}
                containerBorderRadius={0}
                containerStyle={headerStyles.buttonGroup}
                innerBorderStyle={headerStyles.buttonBorder}
                buttonStyle={headerStyles.button}
                textStyle={headerStyles.buttonText}
                selectedButtonStyle={headerStyles.selectedButton}
                selectedTextStyle={headerStyles.selectedButtonText}
            />
        </View>
    );
};

export default Header;