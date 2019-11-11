import { StyleSheet } from 'react-native';

const createWorkOrderComponent = StyleSheet.create({
    headerStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100',
        marginTop: 18,
        marginBottom: 10
    },
    subHeaderStyle: {
        fontSize: 13, 
        alignSelf: 'center'
    },
    elementsContainer: {
        flex: 3,
        
    },
    rowContainer: {
        flexDirection: 'row', 
        alignSelf: 'center',
        marginBottom: 15
    },
    individualContainer: {
        alignContent: 'space-around',
        height: 50, 
        justifyContent: 'center'
    },
    selectedGray:{
        fontSize: 22,
        width: 130,
        textAlign: 'center', 
        backgroundColor: '#a3a3a3', 
        borderRadius: 5,
        marginRight: 15
    },
    unselectedGray:{
        fontSize: 22,
        width: 130,
        textAlign: 'center', 
        backgroundColor: '#cccccc', 
        borderRadius: 5,
        marginRight: 15
    },
    textOnBlue:{
        fontSize: 22,
        width: 130,
        textAlign: 'center', 
        backgroundColor: '#00ace6', 
        borderRadius: 5,
        marginRight: 15
    },
    textOnWhite:{
        fontSize: 22,
        width: 130,
        textAlign: 'center', 
        backgroundColor: '#ffffff', 
        borderRadius: 5,
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
    }
});

export { createWorkOrderComponent };
