import {Platform, StatusBar, StyleSheet} from 'react-native';

const drawerComponent = StyleSheet.create({
    container: {
        flex: 6,
        paddingTop: (Platform.OS === "android" || Platform.OS === "ios")
            ? StatusBar.currentHeight
            : 0
    },
    header: {
        flex: 0.5,
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
    buttonContainer: {
        width:'50%',
        flex: 1,
        height: 500
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
    },
    drawerIcons:{
        width: 20,
        height: 20
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'row'
    }
});

export { drawerComponent };
