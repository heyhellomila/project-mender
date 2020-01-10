import { StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';

const headerStyles = StyleSheet.create({
    headerStyle: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '100',
        marginTop: '3%'
    },
    subHeaderStyle: {
        fontSize: 13,
        alignSelf: 'center'
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
    bodyContainer: {
        flex: 4,
        paddingHorizontal: '4%',
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
    disabledSubmitButton: {
        opacity: 0.3,
        alignSelf: 'flex-end',
        paddingHorizontal: '5%'
    },
    submitButton: {
        alignSelf: 'flex-end',
        marginHorizontal: '5%'
    },
    imageButton: {
        width: 45,
        height: 45
    },
});

const sectorStyles = StyleSheet.create({
    sectorContainer: {
        padding: '1%',
        borderWidth: 2,
        width: '25%',
        height: '80%',
        maxHeight: 200
    },
    activeSectorContainer: {
        padding: '1%',
        borderWidth: 2,
        borderColor: '#00ace6',
        width: '25%',
        height: '80%',
        maxHeight: 200
    },
    activateSectorContainer: {
        padding: '1%',
        borderWidth: 2,
        borderColor: '#05cb05',
        width: '25%',
        height: '80%',
        maxHeight: 200
    },
    deactivateSectorContainer: {
        padding: '1%',
        borderWidth: 2,
        borderColor: 'red',
        width: '25%',
        height: '80%',
        maxHeight: 200
    },
    sectorIcon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    }
});

const spinnerStyles = StyleSheet.create({
    spinnerStyle: {
        alignSelf: 'center',
        flex: 1
    }
});

export { headerStyles, formStyles, footerStyles, sectorStyles, spinnerStyles };
