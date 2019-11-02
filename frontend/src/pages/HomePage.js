import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, Button, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions'

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            loggingOut: false
        }
    }

    static navigationOptions = {
        title: 'Home Page',
    };

    handleLogout = async() => {
        this.setState({ loggingOut: true })
        await this.props.userLogout();
        this.props.navigation.navigate('WelcomePage')
    }

    render() {
        var {loggingOut} = this.state;
        return (
            <View style={styles.container}>
                {loggingOut 
                    ? <Text>Logging out...</Text>
                    : <View style={styles.container}>
                        <View style={{ flex: 0.1, flexDirection: 'row', marginTop: '2%', alignItems: 'center' }}>
                        <View style={{ marginLeft: '1%', width: '20%', justifyContent: 'flex-start' }}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../assets/menderlogo.png')} />
                        </View>
                        <View style={{ justifyContent: 'center', width: '60%' }}><Text style={{ textAlign: 'center' }}>4035 Saint-Ambroise</Text></View>
                        <View style={{ justifyContent: 'flex-end', marginRight: '1%' }}></View>
                        </View>
                        <View style={{ flex: 0.1, alignItems: 'center'}}><Text style={{ fontSize: 30 }}>Hi {this.props.user.user.firstName}!</Text></View>
                        <View style={{ flex: 0.05, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'black' }}>
                            <Text>SEARCH HERE</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#87cefa',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}></View>
                        <Button
                            title="Logout"
                            onPress={() => this.handleLogout()}
                        />
                    </View>}
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
});

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: (Platform.OS === "android" || Platform.OS==="ios") ? StatusBar.currentHeight : 0
    },
});