import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
import { styles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrder';
import JobListComponent  from '../components/jobListPage/JobListComponent';

class JobListPage extends React.Component {

    static navigationOptions = {
        draweLabel: 'Job List Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            property: this.props.property,
            workOrders: [],
            data: [],
            loading: false,
            error: false,
            pageSize: 10,
            pageNumber: 1,
            sortBy: 'id',
            ordering: 'ASC',
            sortIcon: 'sort-up',
            ascending: true,
            priority: ''
        };
        this.handleSort = this.handleSort.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleOrdering = this.handleOrdering.bind(this);
    }
  
    componentDidUpdate(prevProps, prevState) {
        if (this.props.property !== prevProps.property || this.props.navigation !== prevProps.navigation || this.state.sortBy !== prevState.sortBy || this.state.ordering !== prevState.ordering) {
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
        await getWorkOrders(this.props.property.id, this.state.pageSize, this.state.pageNumber, this.state.sortBy, this.state.ordering)
        .then((response) => {
            this.setState({
                workOrders: response.data.map((workOrder) => ({
                    id: workOrder.id,
                    title: workOrder.title,
                    type: workOrder.workOrderType.type,
                    priority: workOrder.priorityType.type,
                    dueDate: workOrder.dueDate
                    }))
            });
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                workOrders: [...this.state.workOrders, ...response.results],
                error: response.error || null,
                loading: false
            });
        })
        .catch((err) => {
           this.setState({error: true, loading: false, errorMsg: err.message})
        });
    }

    handleLoadMore = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 1,
            loading: false}, // ! set to false for testing
            () => this.getListOfWorkOrders()
        )
    }

    handleSort = (value) => {
        switch(value) {
            case 'Sort by Work Order #':
                this.state.sortBy = 'id'
                break;
            case 'Sort by Due Date':
                this.state.sortBy = 'dueDate'
                break;
            case 'Sort by Priority':
                this.state.sortBy = 'priority'
                break;
            case 'Sort by Sector':
                this.state.sortBy = 'sector'
                break;
            case 'Sort by Type':
                this.state.sortBy = 'type'
                break;
            case 'Sort by Status':
                this.state.sortBy = 'status'
            default:
                this.state.sortBy = 'id'
        }
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

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout()),
    selectProperty: (property) => dispatch(selectProperty(property))
});

const mapStateToProps = state => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps, mapDispatchToProps)(JobListPage);
