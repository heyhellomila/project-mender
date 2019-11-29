import { StyleSheet} from 'react-native';

const drawerComponent = StyleSheet.create({
    header: {
        flex: 0.3,
        alignItems: 'center',
        marginTop: '3%'
    },
    logo: {
        height: 50, 
        width: 50, 
    },
    properties: {
        flex: 1.5,
        marginBottom: '3%',
        paddingBottom: '5%'
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
        flex: 0.3,
        alignSelf:'flex-end',
        justifyContent: 'flex-end',
        height: '10%', 
        width:'50%', 
        marginBottom: '1%', 
        paddingBottom: '1%'
    },
    drawerItems: {
        flex: 2,
        justifyContent: 'flex-end'
    }
});

export { drawerComponent };
