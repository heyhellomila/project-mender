import { createWorkOrderComponent } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
roof = require('../../../assets/Roof.png');
kitchen = require('../../../assets/Kitchen.png');
utilities = require('../../../assets/Utilities.png');
livingRoom = require('../../../assets/Living_room.png');
bathroom = require('../../../assets/Bathroom.png');
appliances = require('../../../assets/Appliance.png');
bedroom = require('../../../assets/Bedroom.png');
balcony = require('../../../assets/Balcony.png');
garage = require('../../../assets/Garage.png');
envelope = require('../../../assets/Envelope.png');
electrical = require('../../../assets/Electrical.png');
hvac = require('../../../assets/HVAC.png');
info = require('../../../assets/Information.png');

const ChooseSector = (props) => {
    return (
        <View style={{flex: 1, marginTop: '-5%'}}>
            <View style={createWorkOrderComponent.rowContainer}>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'ROOF' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('ROOF')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={roof}></Image>
                    <Text style={{alignSelf: 'center'}}>Roof</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'KITCHEN' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('KITCHEN')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={kitchen}></Image>
                    <Text style={{alignSelf: 'center'}}>Kitchen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'UTILITIES' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('UTILITIES')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={utilities}></Image>
                    <Text style={{alignSelf: 'center'}}>Utilities</Text>
                </TouchableOpacity>
            </View>
            <View style={createWorkOrderComponent.rowContainer}>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'LIVING_ROOM' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]}
                onPress={()=> props.handleSector('LIVING_ROOM')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={livingRoom}></Image>
                    <Text style={{alignSelf: 'center'}}>Living room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'BATHROOM' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('BATHROOM')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={bathroom}></Image>
                    <Text style={{alignSelf: 'center'}}>Bathroom</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'APPLIANCES' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('APPLIANCES')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={appliances}></Image>
                    <Text style={{alignSelf: 'center'}}>Appliances</Text>
                </TouchableOpacity>
            </View>
            <View style={createWorkOrderComponent.rowContainer}>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'BEDROOM' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('BEDROOM')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={bedroom}></Image>
                    <Text style={{alignSelf: 'center'}}>Bedroom</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'BALCONY' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('BALCONY')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={balcony}></Image>
                    <Text style={{alignSelf: 'center'}}>Balcony</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'GARAGE' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('GARAGE')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={garage}></Image>
                    <Text style={{alignSelf: 'center'}}>Garage</Text>
                </TouchableOpacity>
            </View>
            <View style={createWorkOrderComponent.rowContainer}>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'ENVELOPE' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('ENVELOPE')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={envelope}></Image>
                    <Text style={{alignSelf: 'center'}}>Envelope</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'ELECTRICAL' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('ELECTRICAL')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={electrical}></Image>
                    <Text style={{alignSelf: 'center'}}>Electrical</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[createWorkOrderComponent.colContainer, props.sector == 'HVAC' 
                    ? createWorkOrderComponent.selectedSectorContainer
                    : createWorkOrderComponent.sectorContainer]} 
                onPress={()=> props.handleSector('HVAC')}>
                    <Image style={createWorkOrderComponent.sectorIcon} source={hvac}></Image>
                    <Text style={{alignSelf: 'center'}}>HVAC</Text>
                </TouchableOpacity>
            </View>
            <View style={createWorkOrderComponent.rowContainer}>
                <View style={createWorkOrderComponent.colContainer}>
                    <TouchableOpacity style={{alignSelf:'flex-start'}}>
                        <Image style={{width: 30, height: 30}} source={info}></Image>
                    </TouchableOpacity>
                </View>
                <View style={createWorkOrderComponent.colContainer}>
                    <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => props.nextStep()}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ChooseSector;
