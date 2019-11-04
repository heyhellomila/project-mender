import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { commonFooter } from '../stylesheets/Stylesheet';

export default class CommonFooter extends Component {
    render() {
        return (
            <View style={commonFooter.footerContainer}>
                <View style={{ flex: 3, flexDirection: 'row', marginTop: '2%' }}>
                    <View style={commonFooter.footerIcons}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateHomePage()}>
                            <Image style={commonFooter.footerImage} source={require('../../assets/homeIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={commonFooter.footerIcons}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateJobListPage()}>
                            <Image style={commonFooter.footerImage} source={require('../../assets/jobListIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={commonFooter.footerIcons}>
                        <TouchableOpacity
                            onPress={() => this.props.openWorkModal()}>
                            <Image style={commonFooter.footerImage} source={require('../../assets/addWorkIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={commonFooter.footerIcons}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateShoppingListPage()}>
                            <Image style={commonFooter.footerImage} source={require('../../assets/shoppingListIcon.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={commonFooter.footerIcons}>
                        <TouchableOpacity
                            onPress={() => this.props.navigateEmailPage()}>
                            <Image style={commonFooter.footerImage} source={require('../../assets/emailIcon.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
