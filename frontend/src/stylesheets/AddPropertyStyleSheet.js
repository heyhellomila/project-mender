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
    textInput:{
        fontSize: 16,
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
    invalidPickerStyle: {
        flex: 1,
        alignSelf: 'flex-start',
        width: '100%',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor: 'red'
    },
    disabledPickerStyle: {
        flex: 1,
        alignSelf: 'flex-start',
        width: '100%',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
        borderColor: '#cccccc',
    },
    bodyContainer: {
        flex: 4,
        paddingHorizontal: '7%'
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
    }
});

export { headerStyles, formStyles, footerStyles };
