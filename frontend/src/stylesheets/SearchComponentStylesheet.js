import { Dimensions, StyleSheet } from 'react-native';

const searchStyles = StyleSheet.create({
    searchBar: {
        alignSelf: 'center',
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    searchInput:{
        width: Dimensions.get('window').width*0.75,
        height: Dimensions.get('window').height*0.05,
        borderRadius: 25,
        backgroundColor: '#EEF6F9',
        paddingStart: '5%',
        borderColor: '#EEF6F9',
        borderWidth: 2,
        textAlign: 'center',
        alignSelf: 'center'
    },
    searchIcon: {
        width: 45,
        height: 45,
        borderRadius: 999
    }
});

export {searchStyles} ;