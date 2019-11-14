import { StyleSheet } from 'react-native';

const createWorkOrderComponent = StyleSheet.create({
    headerStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100',
        marginTop: 18,
        marginBottom: 10
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
        borderWidth: 1,
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
        flexDirection: 'row', 
        alignSelf: 'center',
        marginVertical: '15%'
    },
    colContainer: {
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
        fontSize: 16,
        alignSelf: 'center'
    },
    selectedGray:{
        paddingVertical: '2%',
        width: '40%',
        height: '30%',
        backgroundColor: '#a3a3a3', 
        borderRadius: 5,
        marginHorizontal: '2%'
    },
    unselectedGray:{
        paddingVertical: '2%',
        width: '40%',
        height: '30%',
        backgroundColor: '#cccccc', 
        borderRadius: 5,
        marginHorizontal: '2%'
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
        fontSize: 22,
        alignSelf: 'center'
    },
    generalTextInput:{
        fontSize: 22,
        width: 140,
        textAlign: 'center', 
        backgroundColor: '#ffffff', 
        borderColor: 'black',
        borderBottomWidth: 1,
        marginLeft: '10%'
    },
    pickerComponent: {
        width: 130
    },
    notesInput:{
        width:250,
        height: 75,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 5,
        textAlignVertical: 'top'
    },
    footer: {
        flexDirection: 'row', 
    },
});

export { createWorkOrderComponent };
