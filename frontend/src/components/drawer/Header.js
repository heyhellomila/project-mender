import React, { Component } from 'react';
import {drawerComponent} from '../../stylesheets/DrawerStyleSheet';
import {styles} from '../../stylesheets/Stylesheet';
import {Image, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import { connect } from 'react-redux';

const menderLogo = require('../../../assets/mender_logo_no_text.jpg');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        };
    }
    render() {
        return(
            <View style={drawerComponent.header}>
                <Image source={menderLogo} style={styles.imageRightNavLogo} />
                <Text style={drawerComponent.name}>{this.props.user.firstName} {this.props.user.lastName}</Text>
                <View style={drawerComponent.buttonGroup}>
                    <View style={drawerComponent.buttonContainer}>
                        <Button
                            title='Details'
                            type='outline'
                            raised={true}
                            onPress={() => props.navigation.navigate('PropertyDetails')}/>
                    </View>
                    <View style={drawerComponent.buttonContainer}>
                        <Button
                            title='Sectors'
                            type='outline'
                            raised={true}
                            onPress={() => props.navigation.navigate('PropertySectors')}/>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps, null)(Header);