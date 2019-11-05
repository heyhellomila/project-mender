import { DrawerItems } from 'react-navigation-drawer';
import { Image, View, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { userLogout } from '../redux/actions';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

const menderLogo = require('../../assets/menderlogo.png');

class DrawerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggingOut: false,
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
                    <Image source={menderLogo} style={{ height: 120, width: 120 }} />
                </View>
                <View style={{ flex: 3 }}>
                    <Text>PROPERTIES</Text>
                </View>
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

export default connect(null, mapDispatchToProps)(DrawerComponent);
