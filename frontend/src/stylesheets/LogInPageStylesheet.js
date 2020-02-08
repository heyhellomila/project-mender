import { StyleSheet } from 'react-native';

const logInPageStyles = StyleSheet.create({
    logInForm:{
        height: '65%',
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: '3%'
    },
    buttonLogIn:{
        flex:3,
        display: 'flex',
        height: '70%',
        width: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#03ADF7'
    },
    buttonSignUp:{
        flex: 3,
        display: 'flex',
        height: '70%',
        width: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#070D3A',
        marginTop: 15
    },
    buttonText:{
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    imageLogIn:{
        flex:3,
        width: 170,
        height: 170,
        borderRadius: 85,
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    textInput:{
        flex: 1,
        height: '12%', 
        width: '100%',
        borderRadius: 25, 
        backgroundColor: '#EEF6F9', 
        paddingStart: '5%', 
        marginTop: '10%'
    },
    invalidInputView:{
        flex:0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    invalidInput:{
        color: 'red'
    },
});

export { logInPageStyles };