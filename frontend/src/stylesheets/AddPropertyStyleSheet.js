import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
    headerStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100',
        marginTop: '3%',
    }
});

const formStyles = StyleSheet.create({
    container: {
        flex: 6,
        paddingHorizontal: '7%',
        backgroundColor: '#f0f0f0'
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
    infoHeader: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '400'
    },
    textInput:{
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 1,
        alignSelf: 'center',
        width: '70%',
        paddingVertical: '2%',
        borderRadius: 4
    },
    invalidTextInput: {
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderColor: 'red',
        borderWidth: 1,
        alignSelf: 'center',
        width: '70%',
        paddingVertical: '2%',
        borderRadius: 4
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
        marginRight: '5%'
    },
    pickerStyle: {
        width: '75%',
        alignSelf: 'flex-end',
        borderColor: '#cccccc',
        backgroundColor: 'white',
        marginRight: '5%'
    }
});

const footerStyles = StyleSheet.create({
    infoButton: {
        alignSelf: 'flex-start',
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
        padding: '0%',
        borderWidth: 2,
        width: '25%',
        height: '80%'
    },
    selectedSectorContainer: {
        padding: '0%',
        borderWidth: 2,
        borderColor: '#00ace6',
        width: '25%',
        height: '80%'
    },
    sectorIcon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    }
});

const typeStyles = StyleSheet.create({
    typesContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        margin: '15%',
    },
    typeText: {
        fontSize: 20,
        alignSelf: 'center'
    },
    selectedGray:{
        paddingVertical: '2%',
        height: '35%',
        backgroundColor: '#cccccc',
        borderRadius: 8,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#00ace6'
    },
    unselectedGray:{
        paddingVertical: '2%',
        height: '35%',
        backgroundColor: '#cccccc',
        borderRadius: 8,
        justifyContent: 'center'
    }
});

export { headerStyles, formStyles, footerStyles, sectorStyles, typeStyles };
