import React from 'react';
import {drawerComponent} from "../../stylesheets/DrawerStyleSheet";
import {styles} from '../../stylesheets/Stylesheet';
import {Image, Text, View} from "react-native";
import {Button} from "react-native-elements";

const menderLogo = require('../../../assets/mender_new_logo.png');

const Header = (props) => {

    return(
        <View style={drawerComponent.header}>
            <Image source={menderLogo} style={styles.imageTopBarLogo} />
            <Text>{props.user.firstName} {props.user.lastName}</Text>
            <View style={drawerComponent.buttonGroup}>
                <View style={drawerComponent.buttonContainer}>
                    <Button
                        title='Details'
                        type='outline'
                        raised={true}
                        onPress={() => props.navigation.navigate('PropertyDetails')}/>
                </View>
                <View style={drawerComponent.buttonContainer}>
                    <Button
                        title='Sectors'
                        type='outline'
                        raised={true}
                        onPress={() => props.navigation.navigate('PropertySectors')}/>
                </View>
            </View>
        </View>
    );
}

export default Header;
