import { StyleSheet } from 'react-native';

const jobListStyles = StyleSheet.create({
    text: {
        fontSize: 11
    },
    textRatio: {
        fontSize: 9
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
        padding: 10, 
        paddingTop: 35, 
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
        alignContent: 'center',
        marginTop: '50%%',
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
        paddingTop: 10,
        height: 50, 
        backgroundColor: 'white'
    },
    jobListSort: {
        flexDirection: 'row', 
        height: 50, 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    jobListDropdown: {
        marginTop: 10,
        marginLeft: 15
    },
    prioritySection: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 5
    },
    priorities: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center'
    },
    priorityText: {
        fontSize: 11
    },
    loadingContainer: {
        justifyContent: 'center'
    },
    loadMoreIcon: {
        height: 50
    },
    sortIconDown: {
        height: 15,
        width: 15,
        transform: [{rotate: '90deg'}],
    },
    sortIconUp: {
        height: 15,
        width: 15,
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
        borderRadius: 10, 
        elevation: 0, 
        shadowOffset: {height: 0, width: 0}, 
        shadowOpacity: 0, 
        shadowRadius: 0
    },
    topDetails: {
        flexDirection: 'row', 
        alignContent: 'space-between', 
        paddingBottom: 10
    },
    dueDate: {
        fontSize: 12
    },
    title: {
        fontWeight: 'bold', 
        width: 110
    },
    calendar: {
        flexDirection: 'column', 
        alignItems: 'center',
        paddingRight: 10
    },
    arrowIcon: {
        height: 7,
        width: 7
    },
    collapseHeaderSection: {
        flexDirection: 'column', 
        flex: 1,
        paddingRight: 10
    },
    collapseHeaderSectionFirstLine: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10, 
        alignItems: 'center'
    },
    collapseHeaderSectionSecondLine: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    collapseBodySection: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    dateCreated: {
        fontSize: 13, 
        marginBottom: 10, 
        width: 75
    },
    date: {
        fontSize: 13, 
        marginBottom: 10
    },
    collapseBodySectionLeft: {
        fontSize: 11, 
        marginBottom: 10, 
        width: 75, 
        paddingTop: 5
    },
    collapseBodySectionRight: {
        fontSize: 11, 
        marginBottom: 10, 
        backgroundColor: 'white', 
        padding: 5, 
        borderRadius: 5, 
        borderColor: 'white', 
        overflow: 'hidden', 
        flex: 1
    },
    collapseBodySectionBottom: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10
    },
    serviceNeeded: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    serviceNeededText: {
        fontSize: 11, 
        marginRight: 10
    },
    photoSection: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    collapseBodySectionBottomButtons: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginBottom: 10
    }
});

const buttonStyles = StyleSheet.create({
    jobListFilterButtonContainer: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderColor: 'black',
        height: 35
    },
    jobListFilterButton: {
        borderRadius: 20,
        borderColor: 'gray',
        marginLeft: 15
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
        fontSize: 11
    },
    completedButton: {
        borderRadius: 20,
        borderColor: '#a1d19b',
        backgroundColor: '#a1d19b',
        marginRight: 10
    },
    removeButton: {
        borderRadius: 20,
        borderColor: '#e07276',
        backgroundColor: '#e07276'
    },
    editButton: {
        borderRadius: 20,
        borderColor: '#ededed',
        backgroundColor: '#ededed',
        marginRight: 10
    },
    loadMoreButton: {
        borderRadius: 20,
        borderColor: '#f5f5f5',
        backgroundColor: '#f5f5f5',
        padding: 15,
        width: 250
    }
});

const circleStyles = StyleSheet.create({
    redCircle: {
        width: 10, 
        height: 10, 
        borderRadius: 10/2, 
        backgroundColor: 'red'
    },
    yellowCircle: {
        width: 10, 
        height: 10, 
        borderRadius: 10/2, 
        backgroundColor: 'yellow'
    },
    greenCircle: {
        width: 10, 
        height: 10, 
        borderRadius: 10/2, 
        backgroundColor: 'green'
    }
});

export { jobListStyles, headerStyles, jobListCardStyles, buttonStyles, circleStyles };


