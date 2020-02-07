import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles, buttons } from '../stylesheets/Stylesheet';
import { welcomePageStyles } from '../stylesheets/WelcomePageStylesheet';

const menderLogo = require('../../assets/mender_logo.jpg');

class WelcomePage extends React.Component {
    static navigationOptions = {
        title: 'Welcome Page',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.menderWelcomeLogo}>
                    <Image style={styles.imageWelcomeLogo}
                        source={menderLogo} />
                </View>
                <View style={styles.buttonGroup}>
                    <View style={buttons.buttonSignUp}>
                        <TouchableOpacity style={welcomePageStyles.buttonSignUp}
                            onPress={() => this.props.navigation.navigate('SignUpPage')}>
                            <Text style={welcomePageStyles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={buttons.buttonLogIn}>
                        <TouchableOpacity style={welcomePageStyles.buttonLogIn}
                                          onPress={() => this.props.navigation.navigate('LogInPage')}>
                            <Text style={welcomePageStyles.buttonText}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(WelcomePage);
