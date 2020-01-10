import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SectorType} from '../../../constants/enums/SectorType';
import {chunk} from '../../../utils/ArrayUtils';
import {formStyles, sectorStyles} from '../../../stylesheets/PropertySectorsStyleSheet';

const PropertySectorKindComponent = (props) => {
    return(
        <View style={{flex: 1}}>
            <SectorKindView {...props}/>
        </View>
    )
};

export function SectorKindView(props) {
    let kinds = SectorType[props.sectorType].kinds;
    let rows = chunk(Object.keys(kinds), 3);
    const content = rows.map((row, index) => (
        <View key={index} style={formStyles.rowContainer}>
            { row.map( sectorKind =>
                <TouchableOpacity
                    key={sectorKind}
                    disabled={props.submitted}
                    style={[formStyles.colContainer,
                        props.isActive(kinds[sectorKind].kind)
                            ? props.isActiveAndSelected(kinds[sectorKind].kind)
                                ? sectorStyles.deactivateSectorContainer
                                : sectorStyles.activeSectorContainer
                            : props.isSelected(kinds[sectorKind].kind)
                                ? sectorStyles.activateSectorContainer
                                : sectorStyles.sectorContainer
                    ]}
                    onPress={() => props.handleSelectedSectorKinds(kinds[sectorKind].kind)}>
                    <Image style={sectorStyles.sectorIcon} source={kinds[sectorKind].image}></Image>
                    <Text style={{alignSelf: 'center', textAlign: 'center'}}>{kinds[sectorKind].display}</Text>
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

export default PropertySectorKindComponent;
