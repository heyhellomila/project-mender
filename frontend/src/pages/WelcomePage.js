import React from 'react';
import { View, Image } from 'react-native'; 
import { connect } from 'react-redux';
import { ButtonComponent } from '../components/ButtonComponent';
import { styles, buttons } from '../stylesheets/Stylesheet';

const menderLogo = require('../../assets/menderlogo.png');

class WelcomePage extends React.Component {
    static navigationOptions = {
        title: 'Welcome Page',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.menderWelcomeLogo}>
                    <Image
                        source={menderLogo} />
                </View>
                <View style={styles.buttonGroup}>
                    <View style={buttons.buttonSignUp}>
                    <ButtonComponent
                            buttonColor='#d3d3d3'
                            buttonName='Sign Up'
                            buttonFunction={() => this.props.navigation.navigate('SignUpPage')} />
                    </View>
                    <View style={buttons.buttonLogIn}>
                        <ButtonComponent
                            buttonName='Log In'
                            buttonFunction={() => this.props.navigation.navigate('LogInPage')} />
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
