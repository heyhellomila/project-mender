import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import React, { Component } from 'react';
import { userLogout } from '../../redux/actions';
import { connect } from 'react-redux';
import PropertyComponent from "./properties/PropertyComponent";
import Header from './Header';
import LogoutComponent from './LogoutComponent';
import { drawerComponent } from '../../stylesheets/DrawerStyleSheet';

class DrawerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggingOut: false,
        }
    }

    handleLogout = async () => {
        await this.props.userLogout();
        this.props.navigation.navigate('LogInPage')
    };

    render() {
        return (
            <SafeAreaView style={drawerComponent.container}>
                <Header {...this.props}/>
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
