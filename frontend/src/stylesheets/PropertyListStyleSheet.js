import { StyleSheet} from 'react-native';

const propertyList = StyleSheet.create({
    propertyButton: {
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#99d1ff',
        borderWidth: 0,
        borderLeftWidth: 5,
        borderColor: '#fff',
        borderLeftColor: '#3399ff',
        flexDirection: 'row'
    },
    selectedPropertyButton: {
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#99d1ff',
        borderWidth: 2,
        borderLeftWidth: 5,
        borderColor: '#3399ff',
        borderLeftColor: '#3399ff',
        flexDirection: 'row'
    },
    propertyText: {
        color:'black',
        paddingLeft : 10,
        paddingRight : 10
    },
    selectedPropertyText: {
        color:'white',
        paddingLeft : 10,
        paddingRight : 10
    }
});

export { propertyList };
