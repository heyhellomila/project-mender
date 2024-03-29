import { formStyles, sectorStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {chunk} from '../../utils/ArrayUtils';
import {SectorType} from '../../constants/enums/SectorType';

const ChooseSectorKind = (props) => {
    return (
        <SectorKindView {...props}/>
    );
};

export function SectorKindView(props) {
    let kinds = SectorType[props.sectorType].kinds;
    let rows = chunk(Object.keys(kinds), 3);
    const content = rows.map((row, index) => (
        <View key={index} style={formStyles.rowContainer}>
            { row.map( sectorKind =>
                <TouchableOpacity
                    key={sectorKind}
                    style={[formStyles.colContainer, props.sectorKind === kinds[sectorKind].kind
                        ? sectorStyles.selectedSectorContainer
                        : sectorStyles.sectorContainer]}
                    onPress={() => props.handleSectorKind(kinds[sectorKind].kind)}>
                    <Image style={sectorStyles.sectorIcon} source={kinds[sectorKind].image}/>
                    <Text style={sectorStyles.subHeader}>{kinds[sectorKind].display}</Text>
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

export default ChooseSectorKind;
