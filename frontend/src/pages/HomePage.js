import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions';
import { styles } from '../stylesheets/Stylesheet';
import { CommonHeader } from '../components/CommonHeader';

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
                <CommonHeader/>
                <View style={{
                            flex: 4.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {loggingOut 
                    ? <Text>Logging out...</Text>
                    : <View style={styles.container}>
                        {/* <View style={{ flex: 0.1, alignItems: 'center'}}><Text style={{ fontSize: 30 }}>Hi {this.props.user.user.firstName}!</Text></View> */}
                        
                        <Button
                            title="Logout"
                            onPress={() => this.handleLogout()}
                        />
                    </View>}
                        </View>
                
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
