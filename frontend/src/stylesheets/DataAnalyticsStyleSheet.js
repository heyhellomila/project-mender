import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const headerStyles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start', 
        marginLeft: '5%', 
        marginBottom: '5%',
    },
    headerTitle: {
        fontSize: 30, 
        fontWeight: '800', 
        marginBottom: '5%',
    },
    buttonGroup: {
        justifyContent: 'center',
        height: 30,
        borderColor: 'white',
    },
    button: {
        borderRadius: 30,
        backgroundColor: '#dbdbdb', 
        marginRight: '15%',
    },
    buttonBorder: {
        color: 'white',
    },
    buttonText: {
        color: '#060522', 
        padding: 5, 
        fontSize: 15,
        fontWeight: '300',
    },
    selectedButton: {
        borderRadius: 30, 
        backgroundColor: '#060522', 
        marginRight: '15%',
    },
    selectedButtonText: {
        color: 'white', 
        padding: 5, 
        fontSize: 15,
        fontWeight: '800',
    },
});

const dataAnalyticsStyles = StyleSheet.create({ 
    container: {
        justifyContent: 'flex-start', 
        marginLeft: '5%', 
    },
    text: {
        color: '#060522',
        fontSize: 15,
        fontWeight: '200',
    },
    completionRateContainer: {
        flexDirection: 'column', 
        marginLeft: '1%',
    },
    completedContainer: {
        flexDirection: 'row', 
        marginLeft: '5%',
    },
    legendContainer: {
        flexDirection: 'column', 
        marginLeft: '1%', 
        marginTop: '20%',
    },
    completedYouContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: '10%',
    },
    completedContractorContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    completedYouCircle: {
        width: 13,
        height: 13,
        borderRadius: 13/2,
        borderColor: '#565567',
        borderWidth: 3,
        backgroundColor: 'white',
        marginRight: '5%',
    },
    completedContractorCircle: {
        width: 13,
        height: 13,
        borderRadius: 13/2,
        borderColor: '#c1c1c9',
        borderWidth: 3,
        backgroundColor: 'white',
        marginRight: '5%',
    },
    averageTimeContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginLeft: '1%',
        marginRight: '5%',
    },
    averageTimeText: {
        color: '#060522',
        fontSize: 25,
        fontWeight: '800',
    },
});


export { styles, headerStyles, dataAnalyticsStyles };
