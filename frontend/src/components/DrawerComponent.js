import { DrawerItems } from 'react-navigation-drawer';
import { Image, View, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { userLogout } from '../redux/actions';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropertyComponent from './PropertyComponent';
import { drawerComponent } from '../stylesheets/DrawerStyleSheet';

const menderLogo = require('../../assets/menderlogo.png');

class DrawerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggingOut: false,
            user: props.user.user,
            property: props.property
        }
    }

    handleLogout = async () => {
        await this.props.userLogout();
        this.props.navigation.navigate('WelcomePage')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0 }}>
                <View style={drawerComponent.container}>
                    <Image source={menderLogo} style={drawerComponent.logo} />
                    <Text>{this.state.user.firstName} {this.state.user.lastName}</Text>
                </View>
                <Text style={drawerComponent.propertyHeader}>My Properties</Text>
                <ScrollView style={drawerComponent.properties}>
                    <PropertyComponent {...this.props} />
                </ScrollView> 
                <View style={{aligntContent:'flex-end', alignSelf:'flex-end', width:'50%'}}>
                    <Button 
                        title='Add Property'
                        type="outline"
                        raised={true}
                    />
                </View> 
                <ScrollView style={{ marginTop: '5%', paddingTop: '10%'}}>
                    <DrawerItems {...this.props} />
                </ScrollView>
                <View style={drawerComponent.logoutButton}>
                    <Button 
                        title='LOG OUT'
                        onPress={() => this.handleLogout()}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
});
const mapStateToProps = state => ({
    user: state.user,
    property: state.property
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)    ;
