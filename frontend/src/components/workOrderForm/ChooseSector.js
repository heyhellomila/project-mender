import { formStyles, sectorStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

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

const ChooseSector = (props) => {
    return (
        <View style={{flex: 1}}>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'ROOF' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('ROOF')}>
                    <Image style={sectorStyles.sectorIcon} source={roof}></Image>
                    <Text style={{alignSelf: 'center'}}>Roof</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'KITCHEN' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('KITCHEN')}>
                    <Image style={sectorStyles.sectorIcon} source={kitchen}></Image>
                    <Text style={{alignSelf: 'center'}}>Kitchen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'UTILITIES' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('UTILITIES')}>
                    <Image style={sectorStyles.sectorIcon} source={utilities}></Image>
                    <Text style={{alignSelf: 'center'}}>Utilities</Text>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'LIVING_ROOM' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]}
                onPress={()=> props.handleSector('LIVING_ROOM')}>
                    <Image style={sectorStyles.sectorIcon} source={livingRoom}></Image>
                    <Text style={{alignSelf: 'center'}}>Living room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'BATHROOM' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('BATHROOM')}>
                    <Image style={sectorStyles.sectorIcon} source={bathroom}></Image>
                    <Text style={{alignSelf: 'center'}}>Bathroom</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'APPLIANCES' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('APPLIANCES')}>
                    <Image style={sectorStyles.sectorIcon} source={appliances}></Image>
                    <Text style={{alignSelf: 'center'}}>Appliances</Text>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'BEDROOM' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('BEDROOM')}>
                    <Image style={sectorStyles.sectorIcon} source={bedroom}></Image>
                    <Text style={{alignSelf: 'center'}}>Bedroom</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'BALCONY' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('BALCONY')}>
                    <Image style={sectorStyles.sectorIcon} source={balcony}></Image>
                    <Text style={{alignSelf: 'center'}}>Balcony</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'GARAGE' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('GARAGE')}>
                    <Image style={sectorStyles.sectorIcon} source={garage}></Image>
                    <Text style={{alignSelf: 'center'}}>Garage</Text>
                </TouchableOpacity>
            </View>
            <View style={formStyles.rowContainer}>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'ENVELOPE' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('ENVELOPE')}>
                    <Image style={sectorStyles.sectorIcon} source={envelope}></Image>
                    <Text style={{alignSelf: 'center'}}>Envelope</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'ELECTRICAL' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('ELECTRICAL')}>
                    <Image style={sectorStyles.sectorIcon} source={electrical}></Image>
                    <Text style={{alignSelf: 'center'}}>Electrical</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[formStyles.colContainer, props.sector == 'HVAC' 
                    ? sectorStyles.selectedSectorContainer
                    : sectorStyles.sectorContainer]} 
                onPress={()=> props.handleSector('HVAC')}>
                    <Image style={sectorStyles.sectorIcon} source={hvac}></Image>
                    <Text style={{alignSelf: 'center'}}>HVAC</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChooseSector;
