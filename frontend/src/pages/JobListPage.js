import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrders';
import JobListComponent  from '../components/jobListPage/JobListComponent';

class JobListPage extends React.Component {

    static navigationOptions = {
        draweLabel: 'Job List Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            workOrders: [],
            data: [],
            loading: false,
            error: false,
            pageSize: 10,
            pageNumber: 1,
            sortBy: 'id',
            sortByFields: [
            {
                sortBy: 'id',
                dropdown: 'Sort by Work Order #'
            },
            {
                sortBy: 'dueDate',
                dropdown: 'Sort by Due Date'
            },
            {
                sortBy: 'priority',
                dropdown: 'Sort by Priority'
            },
            {
                sortBy: 'sectorType',
                dropdown: 'Sort by Sector Type'
            },
            {
                sortBy: 'sectorKind',
                dropdown: 'Sort by Sector Kind'
            },
            {
                sortBy: 'type',
                dropdown: 'Sort by Type'
            },
            {
                sortBy: 'status',
                dropdown: 'Sort by Status'
            }],
            ordering: 'ASC',
            sortIcon: 'sort-up',
            ascending: true,
            lastPage: false,
            isEmpty: false,
            showSortIndicator: false,
            isSorting: false
        };
    }
  
    componentDidUpdate(prevProps, prevState) {
        if (this.props.property !== prevProps.property) {
            this.setState({
                data: [],
                loading: false,
                error: false,
                pageNumber: 1,
                pageSize: 10,
                sortBy: 'id',
                ordering: 'ASC',
                sortIcon: 'sort-up',
                ascending: true,
                lastPage: false,
                isEmpty: false,
                showSortIndicator: false,
                isSorting: false},
                () => this.getListOfWorkOrders()
            );
        }
        else if (this.state.sortBy !== prevState.sortBy || this.state.ordering !== prevState.ordering) {
            this.setState({
                data: []},
                () => this.getListOfWorkOrders()
            );
        }
    }

    componentDidMount() {
        this.setState({
            loading: false},
            () => this.getListOfWorkOrders()
        );
    }

    async getListOfWorkOrders() {
        this.setState({loading: true});
        await getWorkOrders(this.props.property.id, this.state.pageSize, this.state.pageNumber, this.state.sortBy, this.state.ordering)
        .then((response) => {
            this.setState({
                workOrders: response.data.map((workOrder) => ({
                    id: workOrder.id,
                    title: workOrder.title,
                    cause: workOrder.cause,
                    notification: workOrder.description,
                    type: workOrder.workOrderType.type,
                    priority: workOrder.priorityType.type,
                    sectorType: workOrder.sector.type,
                    sectorKind: workOrder.sector.kind,
                    dueDate: workOrder.dueDate,
                    createdDate: workOrder.createdDate,
                    serviceNeeded: workOrder.serviceNeeded
                    }))
            });
        })
        .then((response) => {
            if (this.state.pageNumber === 1) {
                this.setState({
                    data: this.state.workOrders
                });
            }
            if (this.state.pageNumber !== 1) {
                this.setState({
                    data: (this.state.data).concat(this.state.workOrders)
                })
            }
            if (this.state.data.length % this.state.pageSize !== 0) {
                this.setState({
                    lastPage: true,
                    showSortIndicator: false
                });
            }
            if (this.state.workOrders.length === 0) {
                this.setState({
                    lastPage: true,
                    isEmpty: true
                });
            }
            this.setState({
                loading: false,
                showSortIndicator: false,
                isSorting: false
            });
        })
        .catch((err) => {
            this.setState({
                error: true, 
                loading: false, 
                errorMsg: err.message
            })
            alert(this.state.errorMsg);
        });
    }

    handleLoadMore = () => {
        if (!this.state.loading) {
            this.setState({
                pageNumber: this.state.pageNumber + 1,
                loading: true,
                isEmpty: false},
                () => this.getListOfWorkOrders()
            );
        }
    }

    handleSort = (value) => {
        this.state.sortByFields.map(field => {
            if (value === field.dropdown) {
                this.setState({
                    sortBy: field.sortBy
                });
            }
        });
        this.setState({
            data: [], 
            pageNumber: 1, 
            showSortIndicator: true, 
            isSorting: true, 
            lastPage: false
        });
    }

    handleOrdering = () => {
        this.state.ascending === true
        ? this.setState({
            data: [], 
            pageNumber: 1, 
            ordering: 'DESC', 
            sortIcon: 'sort-down', 
            ascending: false, 
            showSortIndicator: true, 
            isSorting: true, 
            lastPage: false
        })
        : this.setState({
            data: [], 
            pageNumber: 1, 
            ordering: 'ASC', 
            sortIcon: 'sort-up', 
            ascending: true, 
            showSortIndicator: true, 
            isSorting: true, 
            lastPage: false
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <CommonHeader user={this.state.user} />
                <JobListComponent {...this.state} 
                    handleLoadMore={this.handleLoadMore}
                    handleOrdering={this.handleOrdering}
                    handleSort={this.handleSort}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps)(JobListPage);
