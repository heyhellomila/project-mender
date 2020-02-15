import React from 'react';
import { footerStyles, formStyles } from '../../../stylesheets/AddPropertyStyleSheet';
import {Image, TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements';

const backArrow = require('../../../../assets/Back_arrow.png');
const nextArrow = require('../../../../assets/Front_arrow.png');

const Footer = (props) => {
    return(
        <View style={footerStyles.container}>
            <View style={[formStyles.colContainer, footerStyles.leftButton]}>
                {props.step === 2 &&
                    <TouchableOpacity onPress={() => props.prevStep()}>
                        <Image style={footerStyles.imageButton} source={backArrow}/>
                    </TouchableOpacity>
                }
            </View>
            <View style={[formStyles.colContainer, footerStyles.rightButton]}>
                {props.step === 1 &&
                    <TouchableOpacity onPress={() => props.nextStep()}>
                        <Image style={footerStyles.imageButton} source={nextArrow}/>
                    </TouchableOpacity>
                }
                {props.step === 2 &&
                    <TouchableOpacity disabled={props.submitting || props.success}
                                      onPress={() => props.submit()}>
                        {props.success
                            ? <Icon name='check-circle' type='font-awesome' color='#1fcf13' size={45}/>
                            : <Icon name='check-circle' type='font-awesome' size={45}/>
                        }
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default Footer;
