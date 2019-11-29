import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { userLogout } from '../../redux/actions';
import { connect } from 'react-redux';
import PropertyComponent from "./properties/PropertyComponent";
import Header from './Header';
import LogoutComponent from './LogoutComponent';

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
            <SafeAreaView style={{ flex: 6, paddingTop: (Platform.OS === "android" || Platform.OS === "ios")
                    ? StatusBar.currentHeight
                    : 0 }}>
                <Header {...this.props} {...this.state}/>
                <PropertyComponent {...this.props}/>
                <ScrollView style={{flex: 2}}>
                    <DrawerItems {...this.props}/>
                </ScrollView>
                <LogoutComponent handleLogout={this.handleLogout}/>
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
