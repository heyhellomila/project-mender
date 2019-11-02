import React,{Component} from 'react';

import { View, Text, Button } from 'react-native'

export class ButtonComponent extends Component {
    render() {
        return (
            <View>
                <Button 
                title={this.props.buttonName} 
                onPress={this.props.buttonFunction} 
                color={this.props.buttonColor}/>
            </View>
        );
    }
}
export default ButtonComponent;