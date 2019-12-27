import { StyleSheet } from 'react-native';

const jobListStyles = StyleSheet.create({
    text: {
        fontSize: 11
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    jobListContainer: {
        flex: 5, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#fff'
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
        marginLeft: 15,
        fontSize: 13
    },
    prioritySection: {
        flexDirection: 'column', 
        width: 250
    },
    priorities: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center'
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
        padding: 0
    },
    topDetails: {
        flexDirection: 'row', 
        alignContent: 'space-between', 
        paddingBottom: 10
    },
    dueDate: {
        fontSize: 13
    },
    title: {
        fontWeight: 'bold', 
        width: 100
    },
    calendar: {
        flexDirection: 'column', 
        alignItems: 'center',
        paddingRight: 10
    },
    collapseHeaderSection: {
        flexDirection: 'column', 
        width: 300, 
        paddingRight: 10
    },
    collapseHeaderSectionFirstLine: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10, 
        alignItems: 'center',
        width: 300
    },
    collapseHeaderSectionSecondLine: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: 300
    },
    collapseBodySection: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    dateCreated: {
        fontSize: 11, 
        marginBottom: 10, 
        width: 75
    },
    date: {
        fontSize: 11, 
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
        width: 275
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
        fontSize: 13,
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


