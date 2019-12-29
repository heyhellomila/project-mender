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
    infoText: {
        fontSize: 16,
        fontWeight: '300',
        textTransform: 'capitalize'
    },
    provinceText: {
        fontSize: 16,
        fontWeight: '300',
        textTransform: 'uppercase'
    },
    bodyContainer: {
        flex: 4,
        paddingHorizontal: '7%',
        marginTop: '2%'
    },
    detailContainer: {
        flex: 1,
        marginVertical: '4%',
        borderBottomWidth: 1
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
    deleteButton: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        borderRadius: 4,
        width: '75%'
    },
    editButton: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#008ae6',
        justifyContent: 'center',
        borderRadius: 4,
        width: '75%'
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        padding: '5%'
    }
});

export { headerStyles, formStyles, footerStyles };
