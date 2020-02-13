import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Search from 'react-native-search-box';
import { headerStyles} from '../stylesheets/Stylesheet';

export default class CommonHeader extends Component {
    render() {
        return (
            <View style={headerStyles.commonHeaderComponent}>
                <View style={headerStyles.commonHeaderTextComponent}>
                    <Text style={headerStyles.commonHeaderText}>
                        Hi {this.props.user.firstName}!
                    </Text>
                </View>
                <View style={ headerStyles.commonHeaderSearch }>
                    <Search 
                        ref="search_box"
                        backgroundColor="white"
                        titleCancelColor="black"
                    />
                </View>
            </View>
        );
    }
}