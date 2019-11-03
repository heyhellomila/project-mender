import React, { Component } from 'react';
import { Input } from 'react-native-elements';
import { View, Text, Button, Image, Platform, StatusBar } from 'react-native';
import Search from 'react-native-search-box';

export class CommonHeader extends Component {
    render() {
        return (
            <View style={{ flex: 1.5 }}>
                <View style={{ flex: 3, flexDirection: 'row', marginTop: '2%', alignItems: 'center' }}>
                    <View style={{ marginLeft: '2%', width: '20%', justifyContent: 'flex-start' }}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/menderlogo.png')} />
                    </View>
                    <View style={{ justifyContent: 'center', width: '60%' }}><Text style={{ textAlign: 'center' }}>4035 Saint-Ambroise</Text></View>
                    <View style={{ justifyContent: 'flex-end', width: 50, height: 50, borderRadius: 25 }}><Button title='S'></Button></View>
                </View>
                <View style={{ flex: 1.5 }}><Text style={{ textAlign: 'center', fontSize: 25 }}>HI SEB</Text></View>
                <View style={{ flex: 2, alignSelf:'center', width: '75%' }}><Search ref="search_box"></Search></View>
            </View>
        );
    }
}
export default CommonHeader;