import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bodyContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'

    }, menderWelcomeLogo: {
        marginTop: '30%',
        alignSelf: 'center'
    }, buttonGroup: {
        marginTop: '30%',
        flex: 1,
        justifyContent: 'center'
    },
})

const loginComponent = StyleSheet.create({
    logInContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const headerStyles = StyleSheet.create({
    commonHeaderTextComponent:{
        flex: 3
    },
    commonHeaderText:{
        textAlign: 'center', 
        fontSize: 25
    },
    commonHeaderSearch:{
        flex: 3, 
        alignSelf:'center', 
        width: '75%' 
    },
    commonHeaderComponent:{
        flex: 1, 
        borderBottomColor:'#d3d3d3', 
        borderBottomWidth:2
    }
})

const jobListTable = StyleSheet.create({
    jobListTableContainer: {flex: 5, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    jobListTablehead: { height: 40, backgroundColor: '#f1f8ff' },
    jobListTabletext: { margin: 6 },
})

const buttons = StyleSheet.create({
    buttonSignUp: {
        width: '50%',
        alignSelf: 'center',
        borderRadius: 25
    },
    buttonLogIn: {
        marginTop: '5%',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 25
    }
})

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
        borderWidth: 1,
        borderColor: 'white',
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

export { styles, buttons, loginComponent, jobListTable, headerStyles, propertyList } 
