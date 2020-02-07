import { StyleSheet } from 'react-native';

const logInPageStyles = StyleSheet.create({
    logInForm:{
        height: '60%', 
        width: '75%', 
        justifyContent: 'center', 
        alignContent: 'center'},
    buttonLogIn:{
        display: 'flex',
        height: '12%',
        width: '75%',
        borderRadius: 25,
        justifyContent: 'center',
        alignSelf:'center',
        marginTop: '6%',

        backgroundColor: '#03ADF7',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20
    },
    buttonBack:{
        display: 'flex',
        height: '12%',
        width: '75%',
        marginTop: '5%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

        backgroundColor: '#03ADF7',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20
    },
    buttonText:{
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    imageLogIn:{
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'teal',
        alignSelf: 'center'
    },
    textInput:{
        height: '12%', 
        width: '100%', 
        borderColor: 'black', 
        borderRadius: 25, 
        backgroundColor: '#EEF6F9', 
        paddingStart: '5%', 
        marginTop: '10%'
    },
    invalidInputView:{
        alignSelf: 'center',
        marginTop: '3%'
    },
    invalidInput:{
        color: 'red'
    },
});

export { logInPageStyles };