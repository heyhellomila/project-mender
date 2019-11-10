import { StyleSheet} from 'react-native';

const drawerComponent = StyleSheet.create({ 
    container: {
        flex: 1, 
        height: 150, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    logo: {
        height: 50, 
        width: 50, 
        marginTop: '5%'
    },
    properties: {
        flex: 1, 
        marginBottom: '20%' , 
        paddingBottom: '25%'
    }, 
    propertyHeader: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '10%'
    },
    logoutButton: {
        alignSelf:'flex-end', 
        height: '10%', 
        width:'50%', 
        marginBottom: '1%', 
        paddingBottom: '1%'
    }

});

export { drawerComponent };
