import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const logInPageStyles = StyleSheet.create({
    logInForm:{
        justifyContent: 'center',
        alignSelf: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        alignContent: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    logInSignUpSection:{
        alignSelf: 'center',
        width: Dimensions.get('screen').width*0.75
    },
    buttonLogIn:{
        height: Dimensions.get('screen').height*0.05,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#070D3A'
    },
    signUpSection:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: Dimensions.get('screen').height*0.05
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
        width: Dimensions.get('screen').width * 0.45,
        height: Dimensions.get('screen').width * 0.45,
        borderRadius: (Dimensions.get('screen').width * 0.45)/2,
        alignSelf: 'center'
    },
    textInput:{
        width: Dimensions.get('screen').width*0.75,
        height: Dimensions.get('screen').height*0.07,
        borderRadius: 25, 
        backgroundColor: '#EEF6F9', 
        paddingStart: '5%'
    },
    invalidInputView:{
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign:'center',
        width: Dimensions.get('screen').width*0.75,
        height: Dimensions.get('screen').height*0.05,
        borderColor: 'pink',
        borderWidth: 2
    },
    invalidInput:{
        color: '#C52D05',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});

export { logInPageStyles };