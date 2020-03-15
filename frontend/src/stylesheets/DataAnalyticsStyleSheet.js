import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const headerStyles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start', 
        marginLeft: '5%', 
        marginBottom: Dimensions.get('window').height * 0.60,
    },
    headerTitle: {
        fontSize: 30, 
        fontWeight: '800', 
        marginBottom: '5%',
    },
    buttonGroup: {
        justifyContent: 'center',
        height: 30,
        borderColor: 'white',
    },
    button: {
        borderRadius: 30,
        backgroundColor: '#dbdbdb', 
        marginRight: '15%',
    },
    buttonBorder: {
        color: 'white',
    },
    selectedButton: {
        borderRadius: 30, 
        backgroundColor: '#060522', 
        marginRight: '15%',
    },
    selectedButtonText: {
        color: 'white', 
        padding: 5, 
        fontSize: 15,
        fontWeight: 'bold',
    },

});

export { styles, headerStyles };
