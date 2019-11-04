import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

export default class CommonFooter extends Component {
    render() {
        return (
            <View style={{ flex: .5, borderColor: 'black', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', marginTop: '2%' }}>
                    <View style={{ marginLeft: '2%', width: '20%', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateHomePage()}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../assets/homeIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateJobListPage()}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../assets/jobListIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => this.props.openWorkModal()}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../assets/addWorkIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateShoppingListPage()}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../assets/shoppingListIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateEmailPage()}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../assets/emailIcon.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
