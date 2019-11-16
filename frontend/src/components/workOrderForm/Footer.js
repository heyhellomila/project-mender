import React from 'react';
import { formStyles, footerStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import { TouchableOpacity, View, Image } from 'react-native';
import { Icon } from 'react-native-elements'

const info = require('../../../assets/Information.png');

const Footer = (props) => {
    return(
        <View style={{flex: 2}}>
            <View style={formStyles.rowContainer}>
                <View style={formStyles.colContainer}>
                    {props.step === 1
                        ?   <TouchableOpacity style={footerStyles.infoButton}>
                                <Image style={footerStyles.imageButton} source={info}></Image>
                            </TouchableOpacity>
                        :    <TouchableOpacity style={footerStyles.leftButton} 
                                onPress={() => props.prevStep()}>
                                <Icon name='chevron-left' type='octicon' color='white'/>
                            </TouchableOpacity>
                    }
                </View>
                <View style={formStyles.colContainer}>
                    {props.step === 3
                        ?   <TouchableOpacity disabled={props.submitting || props.success} 
                                style={footerStyles.submitButton}
                                onPress={() => props.submit()}>
                                {props.success
                                    ?   <Icon name='check-circle' type='font-awesome' color='#1fcf13' size={45}/>
                                    :   <Icon name='check-circle' type='font-awesome' size={45}/>
                                }
                            </TouchableOpacity>
                        :   <TouchableOpacity style={footerStyles.rightButton} 
                                    onPress={() => props.nextStep()}>
                                    <Icon name='chevron-right' type='octicon' color='white'/>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

export default Footer;