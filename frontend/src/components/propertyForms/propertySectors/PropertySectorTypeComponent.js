import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {chunk} from "../../../utils/ArrayUtils";
import {SectorType} from "../../../constants/enums/SectorType";
import {formStyles, sectorStyles} from "../../../stylesheets/CreateWorkOrderPageStyleSheet";

const PropertySectorTypeComponent = (props) => {
    return(
        <View style={{flex: 1}}>
            <SectorTypeView {...props}/>
        </View>
    )
};

export function SectorTypeView(props) {
    let rows = chunk(Object.keys(SectorType), 3);
    const content = rows.map((row, index) => (
        <View key={index} style={formStyles.rowContainer}>
            { row.map( sectorType =>
                <TouchableOpacity
                    key={sectorType}
                    style={[formStyles.colContainer, props.sectorType === sectorType
                        ? sectorStyles.selectedSectorContainer
                        : sectorStyles.sectorContainer]}
                    onPress={() => props.handleSectorType(sectorType)}>
                    <Image style={sectorStyles.sectorIcon} source={SectorType[sectorType].image}></Image>
                    <Text style={{alignSelf: 'center'}}>{SectorType[sectorType].display}</Text>
                </TouchableOpacity>
            )}
        </View> )
    );
    return (
        <View style={{flex: 1}}>
            {content}
        </View>
    )
}

export default PropertySectorTypeComponent;
