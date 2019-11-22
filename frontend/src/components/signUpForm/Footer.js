import React from 'react';
import { formStyles, footerStyles } from '../../stylesheets/SignUpFormStyleSheet';
import { TouchableOpacity, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const Footer = (props) => {
    return(
        <View style={{flex: 2}}>
            <View style={formStyles.rowContainer}>
                <View style={formStyles.colContainer}>
                    <TouchableOpacity style={footerStyles.leftButton} 
                        onPress={() => props.prevStep()}>
                        <Icon name='chevron-left' type='octicon' color='white'/>
                    </TouchableOpacity>
                </View>
                <View style={formStyles.colContainer}>
                    {props.step === 4
                        &&  <TouchableOpacity disabled={props.submitting} 
                                style={footerStyles.submitButton}
                                onPress={() => props.submit()}>
                                {props.success
                                    ?   <Icon name='check-circle' type='font-awesome' color='#1fcf13' size={45}/>
                                    :   <Icon name='check-circle' type='font-awesome' size={45}/>
                                }
                            </TouchableOpacity>
                    }
                    {props.step === 1
                        &&  <TouchableOpacity style={footerStyles.rightButton} 
                                onPress={() => props.nextStep()}>
                                <Icon name='chevron-right' type='octicon' color='white'/>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
};

export default Footer;
