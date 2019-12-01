import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
    headerStyle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '300',
        marginVertical: '2%'
    },
    subHeaderStyle: {
        fontSize: 13, 
        alignSelf: 'center'
    },
    closeButton: {
        alignSelf: 'flex-start',
        marginLeft: '-5%'
    },
    closeButtonImage: {
        height: 50,
        width: 50
    },
    container: {
        flex: 1, 
        justifyContent: 'center'
    }
});

const formStyles = StyleSheet.create({
    container: {
        flex: 6, 
        paddingHorizontal: '7%'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row', 
        alignSelf: 'center',
        marginVertical: '1%',
        paddingVertical: '7%'
    },
    colContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginHorizontal: '1%',
    },
    subHeader: {
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: '300'
    },
    infoHeader: {
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: '200',
        paddingHorizontal: '2%'
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

const typeStyles = StyleSheet.create({
    container: {
        flex: 2, 
        marginTop: '6%'
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        borderRadius: 2,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#00ace6',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: '400'
    }
});

const accountInfoStyles = StyleSheet.create({
    firstInputGroup: {
        flex: 1, 
        paddingBottom: '3%'
    },
    inputGroup: {
        flex: 1, 
        paddingVertical: '3%'
    }
});

const businessStyles = StyleSheet.create({
    container: {
        flex: 3, 
        marginTop: '6%'
    }
});

const nameStyles = StyleSheet.create({
    inputGroup: {
        flex: 1, 
        paddingVertical: '10%'
    }
});

export { headerStyles, formStyles, footerStyles, typeStyles, accountInfoStyles,
    businessStyles, nameStyles };
