import { headerStyles } from '../../../stylesheets/PropertySectorsStyleSheet';
import {Text, SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { SectorType } from '../../../constants/enums/SectorType';

const x = require('../../../../assets/X.png');

const Header = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <View>
                    <Text style={headerStyles.headerStyle}>
                        {props.sectorType === ''
                            ? 'Sectors'
                            : SectorType[props.sectorType].display
                        }
                    </Text>
                    <Text style={headerStyles.subHeaderStyle}>{props.property.name} ({props.property.address})</Text>
                </View>
                <View style={headerStyles.closeButton}>
                    <TouchableOpacity style={headerStyles.closeButton} onPress={() => props.navigation.goBack(null)}>
                        <Image style={headerStyles.closeButtonImage} source={x}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Header;
