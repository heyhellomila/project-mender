import { StyleSheet} from 'react-native'

const propertyList = StyleSheet.create({
    propertyButton: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#99d1ff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: 'row',
    },
    selectedPropertyButton: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#99d1ff',
        borderRadius:10,
        borderWidth: 2,
        borderColor: '#3399ff',
        flexDirection: 'row',
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
})

export { propertyList }
