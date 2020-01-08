import React from 'react';
import { footerStyles, formStyles } from '../../../stylesheets/PropertySectorsStyleSheet';
import {TouchableOpacity, View, Image} from 'react-native';
import {Icon} from 'react-native-elements';

const backArrow = require('../../../../assets/Back_arrow.png');

const Footer = (props) => {
    return(
        <View style={footerStyles.container}>
            <View style={formStyles.colContainer}>
                {props.sectorType !== '' &&
                    <TouchableOpacity onPress={() => props.handleSectorType('')}>
                        <Image style={footerStyles.imageButton} source={backArrow}></Image>
                    </TouchableOpacity>
                }
            </View>
            <View style={formStyles.colContainer}>
                <TouchableOpacity disabled={!props.canSubmit()}
                                  style={props.canSubmit()
                                      ? footerStyles.editButton
                                      : footerStyles.disabledEditButton}
                                  onPress={() => props.submit()}>
                    {props.success
                        ?   <Icon name='check-circle' type='font-awesome' color='#1fcf13' size={45}/>
                        :   <Icon name='check-circle' type='font-awesome' size={45}/>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Footer;
