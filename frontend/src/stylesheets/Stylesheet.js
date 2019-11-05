import { StyleSheet, Platform, StatusBar } from 'react-native'

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

export { styles, buttons, loginComponent, jobListTable } 
