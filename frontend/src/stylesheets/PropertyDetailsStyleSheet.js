import { StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';

const headerStyles = StyleSheet.create({
    headerStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100',
        marginTop: '3%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    closeButtonImage: {
        height: 50,
        width: 50,
    }
});

const formStyles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#f0f0f0',
        paddingTop: (Platform.OS === "android" || Platform.OS === "ios")
            ? StatusBar.currentHeight
            : 0
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'stretch',
        marginVertical: '1%',
    },
    colContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginHorizontal: '1%'
    },
    infoHeader: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '400'
    },
    infoText: {
        fontSize: 16,
        fontWeight: '300',
        textTransform: 'capitalize'
    },
    provinceText: {
        fontSize: 16,
        fontWeight: '300',
        textTransform: 'uppercase'
    },
    bodyContainer: {
        flex: 4,
        paddingHorizontal: '7%',
        marginTop: '2%'
    },
    detailContainer: {
        flex: 1,
        marginVertical: '4%',
        borderBottomWidth: 1
    },
    textInput:{
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'left',
        width: '100%',
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 1,
        alignSelf: 'flex-start',
        padding: '2%',
        borderRadius: 4
    },
    invalidTextInput: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'left',
        width: '100%',
        backgroundColor: '#ffffff',
        borderColor: 'red',
        borderWidth: 1,
        alignSelf: 'flex-start',
        padding: '2%',
        borderRadius: 4
    },
    pickerStyle: {
        flex: 1,
        alignSelf: 'flex-start',
        width: '100%',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor: '#cccccc',
    },
    pickerOverlayStyle : {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: '5%',
        paddingVertical: '1%'
    },
    inputContainer: {
        flex: 1,
        marginVertical: '6%'
    }
});

const footerStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: '6%',
        padding: '6%'
    },
    deleteButton: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        borderRadius: 4,
        width: '75%'
    },
    toggleEditButton: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#008ae6',
        justifyContent: 'center',
        borderRadius: 4,
        width: '75%'
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        padding: '5%'
    },
    disabledEditButton: {
        opacity: 0.3,
        alignSelf: 'flex-end',
        paddingHorizontal: '5%'
    },
    editButton: {
        alignSelf: 'flex-end',
        marginHorizontal: '5%'
    }
});

export { headerStyles, formStyles, footerStyles };
