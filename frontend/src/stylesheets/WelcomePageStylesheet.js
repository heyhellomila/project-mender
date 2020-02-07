import { StyleSheet } from 'react-native';

const welcomePageStyles = StyleSheet.create({
    buttonSignUp:{
        display: 'flex',
        height: '55%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#1CA5E0',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20
    },
    buttonLogIn:{
        display: 'flex',
        height: '55%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#4EBBEA',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20
    },
    buttonText:{
        fontWeight: 'bold',
        color: 'white'
    }
});

export { welcomePageStyles };