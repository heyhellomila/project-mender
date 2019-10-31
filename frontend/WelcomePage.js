import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';

export default class WelcomePage extends React.Component {
    static navigationOptions = {
        title: 'Welcome Page',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.menderLogo}>
                    <Image
                        source={require('../frontend/assets/menderlogo.png')} />
                </View>
                <View style={styles.buttonGroup}>
                    <View style={styles.buttonSignUp}>
                        <Button
                            color='#d3d3d3'
                            title="Sign Up"
                            onPress={() =>
                                this.props.navigation.navigate('SignUpPage')
                            }
                        />
                    </View>

                    <View style={styles.buttonLogIn}>
                        <Button
                            title="Log In"
                            onPress={() =>
                                this.props.navigation.navigate('LogInPage')
                            }
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }, menderLogo: {
        marginTop: '15%',
        alignSelf: 'center',
    },buttonGroup:{
        marginTop: '30%'
    }, 
    buttonSignUp: {
        width: '50%',
        alignSelf: 'center'
    }, buttonLogIn: {
        marginTop: '5%',
        width: '50%',
        alignSelf: 'center'
    }
});