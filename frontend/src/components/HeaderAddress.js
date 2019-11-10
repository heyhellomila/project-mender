import { DrawerItems } from 'react-navigation-drawer';
import { Image, View, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { userLogout } from '../redux/actions';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropertyComponent from './PropertyComponent';

const menderLogo = require('../../assets/menderlogo.png');

class HeaderAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: props.property
        }
    }

    render() {
        return (
            <View>
                {this.props.property
                    ? <Text>{this.props.property.name}</Text>
                    : null
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    property: state.property.property
});

export default connect(mapStateToProps, null)(HeaderAddress);
