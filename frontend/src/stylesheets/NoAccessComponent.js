import { StyleSheet } from 'react-native';

const noAccessComponent = StyleSheet.create({ 
    container: {
        padding: '15%',
        margin: '5%',
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24, 
        justifyContent: 'center',
        alignItems: 'center', 
        textAlign: 'center'
    },
    button: {
        alignSelf: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    }
});

export { noAccessComponent };
