import { StyleSheet } from 'react-native';

const createWorkOrderComponent = StyleSheet.create({
    headerStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100'
    },
    closeButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    closeButtonImage: {
        height: 50,
        width: 50
    },
    subHeaderStyle: {
        fontSize: 13, 
        alignSelf: 'center'
    },
    elementsContainer: {
        flex: 3,
        
    },
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
    },
    textBackground: {
        borderRadius: 5,
        width: 100,
        height: 40,
        backgroundColor: '#6ebcff',
        marginHorizontal: 15,
        paddingVertical: '2%'
    },
    infoHeader: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '400'
    },
    generalTextInput:{
        fontSize: 16,
        textAlign: 'center', 
        backgroundColor: '#ffffff', 
        borderColor: '#cccccc',
        borderWidth: 1,
        alignSelf: 'center', 
        width: '70%',
        paddingVertical: '2%',
    },
    invalidGeneralTextInput: {
        fontSize: 16,
        textAlign: 'center', 
        backgroundColor: '#ffffff', 
        borderColor: 'red',
        borderWidth: 1,
        alignSelf: 'center', 
        width: '70%',
        paddingVertical: '2%',
    },
    pickerComponent: {
        width: 130,
        fontSize: 24,
        textAlign: 'center',
        borderWidth: 1
    },
    notesInput:{
        width: '100%',
        height: '50%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        padding: '2%'
    },
    footer: {
        flexDirection: 'row', 
    },
    rightButton: {
        alignSelf: 'flex-end',
    },
    leftButton: {
        alignSelf: 'flex-start'
    },
    buttonText: {
        fontSize: 24,
    }
});

export { createWorkOrderComponent };
