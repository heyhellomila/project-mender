import { StyleSheet,Platform, StatusBar } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0
    }, menderWelcomeLogo: {
        marginTop: '30%',
        alignSelf: 'center'
    }, buttonGroup: {
        marginTop: '30%',
        flex: 1,
        justifyContent: 'center'
    },
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

export { styles, buttons } 