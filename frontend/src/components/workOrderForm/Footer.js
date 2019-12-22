import React from 'react';
import { formStyles, footerStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { TouchableOpacity, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const backArrow = require('../../../assets/Back_arrow.png');
const nextArrow = require('../../../assets/Front_arrow.png');
const info = require('../../../assets/Information.png');

const Footer = (props) => {
    return(
        <View style={footerStyles.container}>
            <View style={formStyles.rowContainer}>
                <View style={formStyles.colContainer}>
                    {props.step === 1
                        ?   <TouchableOpacity style={footerStyles.infoButton}>
                                <Image style={footerStyles.imageButton} source={info}></Image>
                            </TouchableOpacity>
                        :    <TouchableOpacity onPress={() => props.prevStep()}>
                                <Image style={footerStyles.imageButton} source={backArrow}></Image>
                            </TouchableOpacity>
                    }
                </View>
                <View style={formStyles.colContainer}>
                    {props.step === 4 &&
                        <TouchableOpacity disabled={props.submitting || props.success}
                                             style={footerStyles.submitButton}
                                             onPress={() => props.submit()}>
                            {props.success
                                ? <Icon name='check-circle' type='font-awesome' color='#1fcf13' size={45}/>
                                : <Icon name='check-circle' type='font-awesome' size={45}/>
                            }
                        </TouchableOpacity>
                    }
                    {props.step === 3 &&
                        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => props.nextStep()}>
                            <Image style={footerStyles.imageButton} source={nextArrow}></Image>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
};

export default Footer;