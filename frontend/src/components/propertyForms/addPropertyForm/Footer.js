import React from 'react';
import { footerStyles } from '../../../stylesheets/AddPropertyStyleSheet';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

const Footer = (props) => {
    return(
        <View style={footerStyles.container}>
            <TouchableOpacity disabled={props.submitting || props.success}
                                  style={{flex: 1}}
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
