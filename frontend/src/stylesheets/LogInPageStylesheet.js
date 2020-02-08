import { StyleSheet } from 'react-native';

const logInPageStyles = StyleSheet.create({
    logInForm:{
        height: '85%',
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        padding: '3%'
    },
    logInSignUpSection:{
        flex: 1,
        justifyContent: 'center'
    },
    buttonLogIn:{
        flex:3,
        display: 'flex',
        height: '70%',
        width: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#070D3A'
    },
    signUpSection:{
        flex: 3, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonSignUp:{
        textDecorationLine: 'underline', 
        color: '#070D3A', 
        fontWeight: 'bold'
    },
    buttonText:{
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    imageLogIn:{
        flex: 2,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    textInput:{
        flex: 0.5,
        height: '12%', 
        width: '100%',
        borderRadius: 25, 
        backgroundColor: '#EEF6F9', 
        paddingStart: '5%', 
        marginTop: '10%'
    },
    invalidInputView:{
        flex:0.4,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    invalidInput:{
        color: '#C52D05',
        fontWeight: 'bold'
    },
});

export { logInPageStyles };