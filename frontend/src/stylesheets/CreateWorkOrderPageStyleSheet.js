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
        marginHorizontal: '1%',
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
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6ebdff',
        borderRadius: 10,
        marginVertical: '1%'
    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: '5%',
    },
    infoHeader: {
        fontSize: 16,
        fontWeight: '500'
    },
    multiLineTextInput: {
        alignSelf: 'stretch',
    },
    titleTextInput: {
        fontSize: 15,
        textAlign: 'center'
    },
    textInput:{
        fontSize: 14,
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
    switchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '80%'
    },
    dateOptionContainer: {
        flex: 1,
        backgroundColor: '#d2d2d2',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
        borderColor: '#f0f0f0',
        borderWidth: 2
    },
    selectedDateOption: {
        borderColor: 'black'
    },
    dateOptionText: {
        fontSize: 14,
        fontWeight: '400'
    },
    overviewContainer: {
        flexWrap: 'wrap',
        marginTop: '3%',
        marginBottom: '-5%'
    },
    detailsContainer: {
        flex: 1,
        marginTop: '7%',
        marginBottom: '-12%'
    },
    chooseTypeContainer: {
        flex: 1,
        marginTop: '25%'
    },
    detailsInfoHeaderContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#6ebdff',
        borderRadius: 10,
        marginVertical: '1%',
        height: '65%',
    },
    toggleInputGroup: {
        flex: 0.3
    },
    priorityInputGroup: {
        marginVertical: '2%',
        flex: 0.5
    },
    priorityList: {
        flex: 0.3
    },
    dueDateInputGroup: {
        flex: 0.4,
        marginVertical: '2%'
    },
    dueDateOptions: {
        flex: 0.5
    }
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
    preventiveIcon: {
        margin: '-10%'
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
        marginTop: '2%',
        width: '75%',
        alignSelf: 'flex-start'
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

const circleStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    redCircle: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: 'red',
        margin: '10%'
    },
    yellowCircle: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: 'yellow',
        margin: '10%'
    },
    greenCircle: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: 'green',
        margin: '10%'
    },
    unselected: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
        backgroundColor: '#00000000',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        margin: '2%'
    },
    selected: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
        backgroundColor: '#00000000',
        borderWidth: 1.5,
        margin: '2%'
    }
});

export { headerStyles, formStyles, footerStyles, sectorStyles, typeStyles, datePickerStyles, circleStyles };
