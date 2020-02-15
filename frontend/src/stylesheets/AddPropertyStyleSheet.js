import { StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';

const headerStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '4%'
    },
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
    },
    titleContainer: {
        flex: 1,
        marginTop: '1%'
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
        marginVertical: '1%'
    },
    colContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginHorizontal: '1%'
    },
    header: {
        flex: 1
    },
    body: {
        flex: 4
    },
    footer: {
        flex: 1,
    },
    infoHeader: {
        fontSize: 20,
        alignSelf: 'flex-end',
        fontWeight: '400',
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
        flex: 1
    },
    pickerSelectStyle: {
        alignSelf: 'flex-start',
        width: '100%',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor: '#cccccc',
    },
    invalidPickerSelectStyle: {
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
        alignSelf: 'flex-start',
        width: '100%',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
        borderColor: '#cccccc',
    },
    unselectedPickerText: {
        color: '#d3d3d3',
        textAlign: 'left'
    },
    pickerText: {
        color: 'black',
        textAlign: 'left'
    },
    pickerOverlayStyle : {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: '5%',
        paddingVertical: '1%'
    },
    generalInfoContainer: {
        flex: 1,
        paddingHorizontal: '7%',
        padding: '55%',
        marginTop: '-67%'
    },
    addressContainer: {
        flex: 4,
        paddingHorizontal: '7%',
        marginTop: '-6%'
    },
    inputContainer: {
        flex: 1
    },
    asteriskStyle: {
        color: 'red'
    }
});

const footerStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '6%',
    },
    imageButton: {
        width: 45,
        height: 45
    },
    leftButton: {
        alignItems: 'flex-start'
    },
    rightButton: {
        alignItems: 'flex-end'
    }
});

export { headerStyles, formStyles, footerStyles };
