import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
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
            lastPage: false
        };
    }
  
    componentDidUpdate(prevProps, prevState) {
        if (this.props.property !== prevProps.property || this.props.navigation !== prevProps.navigation) {
            this.setState({
                pageNumber: 1,
                sortBy: 'id',
                ordering: 'ASC',
                sortIcon: 'sort-up',
                ascending: true,
                lastPage: false
            });
            this.getListOfWorkOrders();
        }
        else if (this.state.sortBy !== prevState.sortBy || this.state.ordering !== prevState.ordering) {
            this.getListOfWorkOrders();
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
            this.setState(prevState => ({
                data: (prevState.data).concat(this.state.workOrders),
                loading: false
            }));
            if (this.state.data.length%this.state.pageSize != 0) {
                this.setState({
                    lastPage: true
                });
            }
        })
        .catch((err) => {
            this.setState({error: true, loading: false, errorMsg: err.message})
            //alert(this.state.errorMsg);
        });
    }

    handleLoadMore = () => {
        if (!this.state.loading) {
            this.setState({
                pageNumber: this.state.pageNumber + 1,
                loading: true},
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
    }

    handleOrdering = () => {
        this.state.ascending === true
        ? this.setState({ordering: 'DESC', sortIcon: 'sort-down', ascending: false})
        : this.setState({ordering: 'ASC', sortIcon: 'sort-up', ascending: true})
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
