import React from 'react';
import { footerStyles, formStyles } from '../../../stylesheets/PropertyDetailsStyleSheet';
import { TouchableOpacity, View, Text } from 'react-native';
import {Icon} from "react-native-elements";

const Footer = (props) => {
    return(
        <View style={footerStyles.container}>
            <View style={formStyles.colContainer}>
                <TouchableOpacity
                    disabled={props.loading}
                    style={footerStyles.toggleEditButton}
                    onPress={() => props.toggleEdit()}>
                    {props.editing
                        ? <Text style={footerStyles.buttonText}>Cancel</Text>
                        : <Text style={footerStyles.buttonText}>Edit</Text>
                    }
                </TouchableOpacity>
            </View>
            <View style={formStyles.colContainer}>
                {props.editing
                     ?
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
                    :
                        <TouchableOpacity
                            disabled={props.loading}
                            style={footerStyles.deleteButton}
                            onPress={() => props.deleteProperty()}>
                            <Text style={footerStyles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default Footer;
