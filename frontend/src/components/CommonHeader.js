import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import Search from 'react-native-search-box';

export default class CommonHeader extends Component {
    render() {
        return (
            <View style={{ flex: 1, borderBottomColor:'#d3d3d3', borderBottomWidth:2}}>
               <View style={{ flex: 3 }}><Text style={{ textAlign: 'center', fontSize: 25 }}>Hi {this.props.user.firstName}</Text></View>
                <View style={{ flex: 3, alignSelf:'center', width: '75%' }}><Search ref="search_box"></Search></View>
            </View>
        );
    }
}
