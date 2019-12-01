import React from 'react';
import { formStyles, footerStyles } from '../../stylesheets/AddPropertyStyleSheet';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

const Footer = (props) => {
    return(
        <View style={formStyles.rowContainer}>
            <TouchableOpacity disabled={props.submitting || props.success}
                                  style={[footerStyles.submitButton]}
                                  onPress={() => props.submit()}>
                {props.success
                    ?   <Icon name='check-circle' type='font-awesome' color='#1fcf13' size={45}/>
                    :   <Icon name='check-circle' type='font-awesome' size={45}/>
                }
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
