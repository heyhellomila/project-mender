import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native'; 
import { connect } from 'react-redux';
import { ButtonComponent } from '../components/ButtonComponent';

class WelcomePage extends React.Component {
    static navigationOptions = {
        title: 'Welcome Page',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.menderLogo}>
                    <Image
                        source={require('../../assets/menderlogo.png')} />
                </View>

                <View style={styles.buttonGroup}>
                    <View style={styles.buttonSignUp}>
                    <ButtonComponent
                            buttonColor='#d3d3d3'
                            buttonName='Sign Up'
                            buttonFunction={() => this.props.navigation.navigate('SignUpPage')} />
                    </View>
                    <View style={styles.buttonLogIn}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }, menderLogo: {
        marginTop: '30%',
        alignSelf: 'center'
    }, buttonGroup: {
        marginTop: '30%',
        flex: 1,
        justifyContent: 'center'
    },
    buttonSignUp: {
        width: '50%',
        alignSelf: 'center',
        borderRadius: 25
    }, buttonLogIn: {
        marginTop: '5%',
        width: '50%',
        alignSelf: 'center',
    }
});
