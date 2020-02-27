import { Dimensions, StyleSheet } from 'react-native';

const jobListStyles = StyleSheet.create({
    text: {
        fontSize: 13
    },
    textRatio: {
        fontSize: 11
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    jobListContainer: {
        flex: 5, 
        padding: '5%', 
        paddingTop: '5%', 
        backgroundColor: '#fff'
    },
    loadMoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    emptyWorkOrders: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    emptyText: {
        fontSize: 15,
        color: '#ababab',
        textAlign: 'center'
    }
});

const headerStyles = StyleSheet.create({
    jobListHeader: { 
        flexDirection: 'row', 
        paddingTop: '3%',
        height: Dimensions.get('window').height * 0.07, 
        backgroundColor: 'white'
    },
    jobListSort: {
        flexDirection: 'row', 
        height: Dimensions.get('window').height * 0.05, 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    jobListDropdown: {
        marginTop: '5%',
        marginLeft: '10%'
    },
    prioritySection: {
        flex: 1,
        flexDirection: 'column'
    },
    priorities: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center'
    },
    priorityText: {
        fontSize: 13
    },
    loadingContainer: {
        justifyContent: 'center'
    },
    loadMoreIcon: {
        height: Dimensions.get('window').height * 0.5
    },
    sortIconDown: {
        height: Dimensions.get('window').height * 0.02,
        width: Dimensions.get('window').height * 0.02,
        transform: [{rotate: '90deg'}],
    },
    sortIconUp: {
        height: Dimensions.get('window').height * 0.02,
        width: Dimensions.get('window').height * 0.02,
        transform: [{rotate: '-90deg'}],
    }
});

const jobListCardStyles = StyleSheet.create({
    jobListCardContainer: {
        backgroundColor: '#dfdfdf', 
        borderColor: '#dfdfdf', 
        borderRadius: 10, 
        elevation: 0, 
        shadowOffset: {height: 0, width: 0}, 
        shadowOpacity: 0, 
        shadowRadius: 0,
        width: '95%',
        padding: 0
    },
    workOrderCard: {
        backgroundColor: '#dfdfdf', 
        borderRadius: 10, 
        padding: 0,
        borderColor: '#dfdfdf', 
        elevation: 0,
        shadowOffset: {height: 0, width: 0}, 
        shadowOpacity: 0, 
        shadowRadius: 0
    },
    topDetails: {
        flexDirection: 'row', 
        paddingBottom: '5%',
        height: Dimensions.get('window').height * 0.1
    },
    dueDate: {
        fontSize: 13
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold', 
        width: Dimensions.get('window').width * 0.4
    },
    calendar: {
        flexDirection: 'column', 
        alignItems: 'center',
        marginRight: '5%',
        justifyContent: 'center'
    },
    arrowIcon: {
        height: Dimensions.get('window').width * 0.02,
        width: Dimensions.get('window').width * 0.02
    },
    collapseHeaderSection: {
        flexDirection: 'column', 
        flex: 1,
        paddingRight: '2%',
        justifyContent: 'space-evenly'
    },
    collapseHeaderSectionFirstLine: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: '2%', 
        alignContent: 'flex-start'
    },
    collapseHeaderSectionLine: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    collapseBodySection: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    dateCreated: {
        fontSize: 13, 
        marginBottom: '5%', 
        width: Dimensions.get('window').width * 0.22
    },
    date: {
        fontSize: 13
    },
    collapseBodySectionLeft: {
        fontSize: 13, 
        marginBottom: '5%', 
        width: '25%'
    },
    collapseBodySectionRight: {
        flex: 1,
        fontSize: 13, 
        marginBottom: '5%', 
        backgroundColor: 'white', 
        padding: 5, 
        borderRadius: 5, 
        borderColor: 'white', 
        overflow: 'hidden'
    },
    collapseBodySectionBottom: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2%'
    },
    serviceNeeded: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    serviceNeededText: {
        fontSize: 13, 
        marginRight: '5%'
    },
    photoSection: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2%'
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: '5%'
    },
    collapseBodySectionBottomButtons: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        height: Dimensions.get('window').height * 0.05,
        marginBottom: '2%',
    }
});

const buttonStyles = StyleSheet.create({
    jobListFilterButtonContainer: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderColor: 'black',
        height: Dimensions.get('window').height * 0.05
    },
    jobListFilterButton: {
        borderRadius: 20,
        borderColor: 'black',
        marginLeft: 15
    },
    jobListFilterButtonSelected: {
        borderRadius: 20,
        borderColor: '#b8daff',
        marginLeft: 15,
        backgroundColor: '#b8daff'
    },
    jobListFilterButtonTitle: {
        color: 'black',
        fontSize: 11,
        padding: 5
    },
    viewQuotesButton: {
        borderRadius: 20,
        borderColor: '#ababab',
        backgroundColor: '#ababab'
    },
    buttonTitle: {
        color: 'black',
        padding: 5,
        fontSize: 13
    },
    completedButton: {
        borderRadius: 20,
        borderColor: '#66e856',
        backgroundColor: '#66e856',
        marginRight: '5%'
    },
    removeButton: {
        borderRadius: 20,
        borderColor: '#e07276',
        backgroundColor: '#e07276',
        marginLeft: '5%'
    },
    editButton: {
        borderRadius: 20,
        borderColor: '#ededed',
        backgroundColor: '#ededed',
        marginRight: '5%',
        marginLeft: '5%'
    },
    loadMoreButton: {
        borderRadius: 25,
        borderColor: '#f5f5f5',
        backgroundColor: '#f5f5f5',
        padding: 15,
        width: Dimensions.get('window').width * 0.7
    }
});

const circleStyles = StyleSheet.create({
    redCircle: {
        width: Dimensions.get('window').width * 0.03,
        height: Dimensions.get('window').width * 0.03,
        borderRadius: (Dimensions.get('window').width * 0.03)/2,
        backgroundColor: 'red'
    },
    yellowCircle: {
        width: Dimensions.get('window').width * 0.03,
        height: Dimensions.get('window').width * 0.03,
        borderRadius: (Dimensions.get('window').width * 0.03)/2,
        backgroundColor: 'yellow'
    },
    greenCircle: {
        width: Dimensions.get('window').width * 0.03,
        height: Dimensions.get('window').width * 0.03,
        borderRadius: (Dimensions.get('window').width * 0.03)/2,
        backgroundColor: 'green'
    }
});

const filterStyles = StyleSheet.create({
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    modal: {
        justifyContent: 'flex-end', 
        margin: 0, 
        marginLeft: '5%', 
        marginRight: '5%'
    },
    filterView: {
        flex: 1, 
        flexDirection: 'column', 
        marginTop: '20%'
    },
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'baseline', 
        alignContent: 'space-between'
    },
    filterTitle: {
        fontSize: 25, 
        fontWeight: 'bold'
    },
    cancelButton: {
        borderRadius: 0, 
        borderColor: 'white', 
        backgroundColor: 'white'
    },
    cancelButtonTitle: {
        color: '#1a6efe'
    },
    separator: {
        borderBottomColor: '#f0f0f3',
        borderBottomWidth: 1
    },
    filterContainerBookmarked: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'baseline', 
        marginTop: 50
    },
    filterContainer: {
        flexDirection: 'column',
        marginTop: 50
    },
    filterText: {
        fontSize: 20,
        marginBottom: '10%'
    },
    applyContainer: {
        justifyContent: 'flex-end', 
        marginBottom: '25%'
    },
    applyButton: {
        borderRadius: 0, 
        height: Dimensions.get('window').height * 0.06
    }
});

export { jobListStyles, headerStyles, jobListCardStyles, buttonStyles, circleStyles, filterStyles };


