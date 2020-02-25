import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';

const logInPageStyles = StyleSheet.create({
    container:{
        paddingTop: (Platform.OS === "android" || Platform.OS === "ios")
            ? StatusBar.currentHeight
            : 0
    },
    logInForm:{
        justifyContent: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignContent: 'center'
    },
    logInSignUpSection:{
        alignSelf: 'center',
        width: Dimensions.get('window').width*0.75
    },
    buttonLogIn:{
        height: Dimensions.get('window').height*0.06,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#070D3A'
    },
    signUpSection:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: Dimensions.get('window').height*0.05
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
    imageLogInView:{
        aspectRatio: 6/5.5,
        padding: '10%'
    },
    imageLogIn:{
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.45,
        borderRadius: (Dimensions.get('window').width * 0.45)/2,
        alignSelf: 'center'
    },
    textInputView:{
        alignItems: 'center',
        aspectRatio: 7/2.65
    },
    textInput:{
        width: Dimensions.get('window').width*0.75,
        height: Dimensions.get('window').height*0.06,
        borderRadius: 25, 
        backgroundColor: '#EEF6F9', 
        paddingStart: '5%',
        borderColor: '#EEF6F9',
        borderWidth: 2
    },
    textInvalidInput:{
        width: Dimensions.get('window').width*0.75,
        height: Dimensions.get('window').height*0.06,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 25,
        backgroundColor: '#EEF6F9',
        paddingStart: '5%'
    },
    invalidInputView:{
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign:'center',
        width: Dimensions.get('window').width*0.75
    },
    invalidInput:{
        color: '#C52D05',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: '2%'
    },
});

export { logInPageStyles };