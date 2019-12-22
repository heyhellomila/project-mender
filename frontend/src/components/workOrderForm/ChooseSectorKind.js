import { formStyles, sectorStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {chunk} from "../../utils/ArrayUtil";
import {SectorType} from "../../constants/enums/SectorType";

const roof = require('../../../assets/Roof.png');
const kitchen = require('../../../assets/Kitchen.png');
const utilities = require('../../../assets/Utilities.png');
const livingRoom = require('../../../assets/Living_room.png');
const bathroom = require('../../../assets/Bathroom.png');
const appliances = require('../../../assets/Appliance.png');
const bedroom = require('../../../assets/Bedroom.png');
const balcony = require('../../../assets/Balcony.png');
const garage = require('../../../assets/Garage.png');
const envelope = require('../../../assets/Envelope.png');
const electrical = require('../../../assets/Electrical.png');
const hvac = require('../../../assets/HVAC.png');

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

export default ChooseSectorKind;
