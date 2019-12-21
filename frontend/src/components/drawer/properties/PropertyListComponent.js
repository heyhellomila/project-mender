import React  from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { propertyList } from '../../../stylesheets/PropertyListStyleSheet';
import {drawerComponent} from "../../../stylesheets/DrawerStyleSheet";

const PropertyListComponent = (props) => {
    return (
        <View style={{alignItems: 'stretch'}}>
            {props.properties.map((property) => (
                <TouchableOpacity style={(props.property && props.property.id === property.id)
                    ? propertyList.selectedPropertyButton
                    : propertyList.propertyButton}
                      key={property.id}
                      onPress={() => {props.selectProperty(property); props.navigation.closeDrawer();}}>
                    <Text style={(props.property && props.property.id === property.id)
                        ? propertyList.selectedPropertyText
                        : propertyList.propertyText}>
                        {property.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default PropertyListComponent;
