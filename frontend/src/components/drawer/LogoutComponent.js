import React from 'react';
import {drawerComponent} from "../../stylesheets/DrawerStyleSheet";
import {Button} from "react-native-elements";
import {View} from "react-native";

const LogoutComponent = (props) => {
    return(
        <View style={drawerComponent.logoutButton}>
            <Button
                title='LOG OUT'
                onPress={() => props.handleLogout()}
            />
        </View>
    )
}

export default LogoutComponent;
