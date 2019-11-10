import { DrawerItems } from 'react-navigation-drawer';
import { Image, View, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { userLogout } from '../redux/actions';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropertyComponent from './PropertyComponent';

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
                <View style={{ flex: 2, height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={menderLogo} style={{ height: 100, width: 100 }} />
                    <Text>{this.state.user.firstName} {this.state.user.lastName}</Text>
                </View>
                <ScrollView style={{ flex: 3}}>
                    <PropertyComponent {...this.props}/>
                </ScrollView>
                <ScrollView>
                    <DrawerItems {...this.props} />
                </ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{alignSelf:'flex-end', width:'50%'}}>
                        <Button 
                            title='LOG OUT'
                            onPress={() => this.handleLogout()}
                        />
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
