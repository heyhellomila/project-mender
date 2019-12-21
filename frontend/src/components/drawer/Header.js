import React from 'react';
import {drawerComponent} from "../../stylesheets/DrawerStyleSheet";
import {Image, Text, View} from "react-native";

const menderLogo = require('../../../assets/menderlogo.png');

const Header = (props) => {

    return(
        <View style={drawerComponent.header}>
            <Image source={menderLogo} style={drawerComponent.logo} />
            <Text>{props.user.firstName} {props.user.lastName}</Text>
        </View>
    );
}

export default Header;
