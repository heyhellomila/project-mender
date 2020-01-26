import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrders';
import JobListComponent  from '../components/jobListPage/JobListComponent';

class JobListPage extends React.Component {

    static navigationOptions = {
        title: 'Job List'
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
            defaultSortBy: 'Sort by Work Order #',
            sortByFields: [
                {sortBy: 'id', dropdown: 'Sort by Work Order #'},
                {sortBy: 'dueDate', dropdown: 'Sort by Due Date'},
                {sortBy: 'priorityType',dropdown: 'Sort by Priority'},
                {sortBy: 'sectorType', dropdown: 'Sort by Sector'},
                {sortBy: 'workOrderType', dropdown: 'Sort by Type'},
                {sortBy: 'workOrderStatus', dropdown: 'Sort by Status'}
            ],
            ordering: 'ASC',
            sortIcon: 'up',
            ascending: true,
            lastPage: false,
            isEmpty: false,
            showSortIndicator: false,
            isSorting: false,
            isFiltering: false,
            filterSwitch: false,
            priorityOptions: [
                {label: 'All', value: 0},
                {label: 'Low', value: 1},
                {label: 'Medium', value: 2},
                {label: 'High', value: 3}
            ],
            sectorOptions: [
                {label: 'All', value: 0},
                {label: 'Building', value: 1},
                {label: 'Electricity', value: 2},
                {label: 'Structure', value: 3},
                {label: 'Exterior', value: 4},
                {label: 'Utility', value: 5},
                {label: 'HVAC', value: 6},
                {label: 'Interor finish', value: 7},
                {label: 'Appliances', value: 8}
            ],
            filterPriorityOptionValue: 0,
            filterSectorOptionValue: 0,
            filterBookmarked: '',
            filterDueDate: '',
            filterPriority: '',
            filterSector: '',
            filterType: '',
            filterStatus: '',
            isBookmarkedModalVisible: false,
            isDueDateModalVisible: false,
            isPriorityModalVisible: false,
            isSectorModalVisible: false,
            isTypeModalVisible: false,
            isStatusModalVisible: false
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
                lastPage: false,
                isEmpty: false,
                showSortIndicator: false,
                isSorting: false,
                isFiltering: false,
                filterSwitch: false,
                filterPriorityOptionValue: 0,
                filterBookmarked: '',
                filterPriority: '',
                filterSector: ''},
                () => this.getListOfWorkOrders()
            );
        }
        if (this.state.sortBy !== prevState.sortBy || 
            this.state.ordering !== prevState.ordering || 
            this.state.isFiltering !== prevState.isFiltering) {
            this.setState({
                data: [],
                isEmpty: false},
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
        await getWorkOrders(this.props.property.id, this.state.pageSize, this.state.pageNumber, this.state.sortBy, this.state.ordering, 
            this.state.filterBookmarked, '', this.state.filterPriority, this.state.filterSector)
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
                    serviceNeeded: workOrder.serviceNeeded,
                    status: workOrder.workOrderStatus.status
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
                isSorting: false,
                isFiltering: false
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

    toggleBookmarkedModal = () => {
        this.setState({
            isBookmarkedModalVisible: !this.state.isBookmarkedModalVisible
        });
    }

    toggleDueDateModal = () => {
        this.setState({
            isDueDateModalVisible: !this.state.isDueDateModalVisible
        });
    }

    togglePriorityModal = () => {
        this.setState({
            isPriorityModalVisible: !this.state.isPriorityModalVisible
        });
    }

    toggleSectorModal = () => {         
        this.setState({
            isSectorModalVisible: !this.state.isSectorModalVisible
        });
    }

    toggleTypeModal = () => {
        this.setState({
            isTypeModalVisible: !this.state.isTypeModalVisible
        });
    }

    toggleStatusModal = () => {
        this.setState({
            isStatusModalVisible: !this.state.isStatusModalVisible
        });
    }

    toggleBookmarkedSwitch = (value) => {
        this.setState({
            filterSwitch: value
        })
    }

    togglePriorityOption = (value) => {
        this.setState({
            filterPriorityOptionValue: value
        });
    }

    toggleSectorOption = (value) => {
        this.setState({
            filterSectorOptionValue: value
        });
    }

    handleCancelBookmarkedFilter = () => {
        if (this.state.filterBookmarked === 'true') {
            this.setState({
                filterSwitch: true
            });
        } else {
            this.setState({
                filterSwitch: false
            });
        }
        this.toggleBookmarkedModal()
    }

    handleCancelPriorityFilter = () => {
        this.state.priorityOptions.map(option => {
            if (this.state.filterPriority === '') {
                this.setState({
                    filterPriorityOptionValue: 0
                })
            } else if (this.state.filterPriority === option.label) {
                this.setState({
                    filterPriorityOptionValue: option.value
                });
            }
        });
        this.togglePriorityModal()
    }

    handleCancelSectorFilter = () => {
        this.state.sectorOptions.map(option => {
            if (this.state.filterSector === '') {
                this.setState({
                    filterSectorOptionValue: 0
                })
            } else if (this.state.filterSector.replace(/_/g, ' ') === option.label) {
                this.setState({
                    filterSectorOptionValue: option.value
                });
            }
        });
        this.toggleSectorModal()
    }

    handleApplyBookmarkedFilter = () => {
        if (this.state.filterSwitch) {
            this.setState({
                filterBookmarked: 'true'
            });
        } else {
            this.setState({
                filterBookmarked: ''
            });
        }
        this.setState({
            isFiltering: !this.state.isFiltering},
            () => this.toggleBookmarkedModal()
        );
    }

    handleApplyPriorityFilter = () => {
        this.state.priorityOptions.map(option => {
            if (this.state.filterPriorityOptionValue === 0) {
                this.setState({
                    filterPriority: ''
                })
            } else if (this.state.filterPriorityOptionValue === option.value) {
                this.setState({
                    filterPriority: option.label
                });
            }
        });
        this.setState({
            isFiltering: !this.state.isFiltering},
            () => this.togglePriorityModal()
        );
    }

    handleApplySectorFilter = () => {
        this.state.sectorOptions.map(option => {
            if (this.state.filterSectorOptionValue === 0) {
                this.setState({
                    filterSector: ''
                })
            } else if (this.state.filterSectorOptionValue === option.value) {
                this.setState({
                    filterSector: option.label.replace(/ /g, '_')
                });
            }
        });
        this.setState({
            isFiltering: !this.state.isFiltering},
            () => this.toggleSectorModal()
        );
    }

    handleSort = (index, value) => {
        this.state.sortByFields.map(field => {
            if (value === field.dropdown) {
                this.setState({
                    sortBy: field.sortBy,
                    defaultSortBy: field.dropdown
                });
            }
        });
        this.setState({
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
                sortIcon: 'down', 
                ascending: false, 
                showSortIndicator: true, 
                isSorting: true, 
                lastPage: false
            })
            : this.setState({
                data: [], 
                pageNumber: 1, 
                ordering: 'ASC', 
                sortIcon: 'up', 
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
                    toggleBookmarkedModal={this.toggleBookmarkedModal}
                    toggleDueDateModal={this.toggleDueDateModal}
                    togglePriorityModal={this.togglePriorityModal}
                    toggleSectorModal={this.toggleSectorModal}
                    toggleTypeModal={this.toggleTypeModal}
                    toggleStatusModal={this.toggleStatusModal}
                    toggleBookmarkedSwitch={this.toggleBookmarkedSwitch}
                    togglePriorityOption={this.togglePriorityOption}
                    toggleSectorOption={this.toggleSectorOption}
                    handleCancelBookmarkedFilter={this.handleCancelBookmarkedFilter}
                    handleCancelPriorityFilter={this.handleCancelPriorityFilter}
                    handleCancelSectorFilter={this.handleCancelSectorFilter}
                    handleApplyBookmarkedFilter={this.handleApplyBookmarkedFilter}
                    handleApplyPriorityFilter={this.handleApplyPriorityFilter}
                    handleApplySectorFilter={this.handleApplySectorFilter}
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
