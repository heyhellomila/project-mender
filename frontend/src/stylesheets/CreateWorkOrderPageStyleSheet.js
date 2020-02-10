import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
    headerStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100'
    },
    subHeaderStyle: {
        fontSize: 13, 
        alignSelf: 'center'
    },
    closeButton: {
        alignSelf: 'flex-end',
        position: 'absolute'
    },
    closeButtonImage: {
        height: 50,
        width: 50
    }
});

const formStyles = StyleSheet.create({
    container: {
        flex: 6, 
        backgroundColor: '#f0f0f0'
    },
    bodyContainer: {
        flex: 6,
        paddingHorizontal: '5%',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: '1%',
    },
    colContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginHorizontal: '1%'
    },
    titleInputGroup: {
        flex: 1,
        marginTop: '5%',
        marginBottom: '-6%'
    },
    inputGroup: {
        flex: 1,
        textAlign: 'center',
        marginVertical: '1%'
    },
    infoHeaderContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6ebdff',
        borderRadius: 10,
        marginVertical: '1%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: '5%',
    },
    infoHeader: {
        fontSize: 20,
        fontWeight: '500'
    },
    multiLineTextInput: {
        alignSelf: 'stretch',
    },
    titleTextInput: {
        fontSize: 19,
        textAlign: 'center'
    },
    textInput:{
        fontSize: 16,
        textAlign: 'left',
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 1,
        alignSelf: 'flex-start',
        width: '100%',
        padding: '3%',
        borderRadius: 10,
    },
    invalidTextInput: {
        fontSize: 16,
        textAlign: 'center', 
        backgroundColor: '#ffffff', 
        borderColor: 'red',
        borderWidth: 1,
        alignSelf: 'flex-start',
        width: '100%',
        paddingVertical: '3%',
        borderRadius: 10,
    },
    notesInput: {
        width: '100%',
        height: '50%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        padding: '2%'
    },
    switchStyle: {
        alignSelf: 'flex-end',
    },
    pickerStyle: {
        width: '75%',
        alignSelf: 'flex-end',
        borderColor: '#cccccc',
        backgroundColor: 'white',
    },
    pickerOverlayStyle : {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: '5%',
        paddingVertical: '1%'
    },
});

const footerStyles = StyleSheet.create({
    container: {
        flex: 2,
        paddingHorizontal: '3%'
    },
    infoButton: {
        alignSelf: 'flex-end',
    },
    submitButton: {
        alignSelf: 'flex-end',
        width: '30%'
    },
    rightButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#008ae6',
        padding: '5%',
        borderRadius: 5,
        width: '30%'
    },
    leftButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#008ae6',
        padding: '5%',
        borderRadius: 5,
        width: '30%'
    },
    imageButton: {
        width: 45, 
        height: 45
    },
    successButton: {
        width: 45, 
        height: 45,
        backgroundColor: '#17d402', 
        borderRadius: 25
    }
});

const sectorStyles = StyleSheet.create({
    sectorContainer: {
        padding: '3%',
        width: '25%',
        height: '80%',
        maxHeight: 200,
        borderRadius: 10,
        backgroundColor: '#d2d2d2',
    },
    selectedSectorContainer: {
        padding: '1%',
        borderWidth: 2,
        borderColor: '#00ace6',
        width: '25%', 
        height: '80%',
        maxHeight: 200
    },
    sectorIcon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        margin: '5%'
    },
    subHeader: {
        alignSelf: 'center',
        marginVertical: '5%',
        textAlign: 'center'
    }
});

const typeStyles = StyleSheet.create({
    typeContainer: {
        padding: '3%',
        width: '50%',
        height: '80%',
        maxHeight: 200,
        borderRadius: 20,
        backgroundColor: '#d2d2d2'
    },
    typeIcon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        margin: '5%'
    },
    subHeader: {
        alignSelf: 'center',
        marginVertical: '5%',
        textAlign: 'center'
    }
});

const datePickerStyles = StyleSheet.create({
    style: {
        width: 200, alignSelf: 'flex-end'
    },
    dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
    },
    dateInput: {
        marginLeft: 36,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: '#cccccc',
    },
    darkDatePickerCon: {
        backgroundColor: 'black'
    },
    lightDatePickerCon: {
        backgroundColor: 'white'
    }
});

export { headerStyles, formStyles, footerStyles, sectorStyles, typeStyles, datePickerStyles };
