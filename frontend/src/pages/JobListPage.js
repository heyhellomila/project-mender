import React from 'react';
import {Alert, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrders';
import JobListComponent  from '../components/jobListPage/JobListComponent';
import moment from 'moment';
import { reloadWorkOrders } from '../redux/actions';
import {updateWorkOrderById} from "../apis/workOrders/updateWorkOrderById";
import {WorkOrderStatus} from "../constants/enums/WorkOrderStatus";

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
            today: new Date(),
            dueDateOptions: [
                {label: 'All', value: 0},
                {label: 'Past Due', value: 1},
                {label: 'Today', value: 2},
                {label: 'This Week', value: 3},
                {label: 'This Month', value: 4},
                {label: 'This Year', value: 5}
            ],
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
                {label: 'Interior Finish', value: 7},
                {label: 'Appliances', value: 8}
            ],
            typeOptions: [
                {label: 'All', value: 0},
                {label: 'Corrective', value: 1},
                {label: 'Preventive', value: 2}
            ],
            statusOptions: [
                {label: 'All', value: 0},
                {label: 'Cancelled', value: 1},
                {label: 'Completed', value: 2},
                {label: 'Issued', value: 3},
                {label: 'Open for Quote', value: 4},
                {label: 'Quote Received', value: 5}
            ],
            filterDueDateOptionValue: 0,
            filterPriorityOptionValue: 0,
            filterSectorOptionValue: 0,
            filterTypeOptionValue: 0,
            filterStatusOptionValue: 0,
            filterBookmarked: '',
            filterDueDate: 'All',
            filterPriority: '',
            filterSector: '',
            filterType: '',
            filterStatus: '',
            isBookmarkedModalVisible: false,
            isDueDateModalVisible: false,
            isPriorityModalVisible: false,
            isSectorModalVisible: false,
            isTypeModalVisible: false,
            isStatusModalVisible: false,
            greaterThan: '',
            greaterThanValue: '',
            lowerThan: '',
            lowerThanValue: ''
        };
    }
  
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.reloadWorkOrders && !this.state.loading && !prevState.loading) {
            this.setState({
                lastPage: false,
                isEmpty: false,
                data: []
            });
            await this.getListOfWorkOrders().then(() => {
                this.props.finishReloadingWorkOrders();
            })
        }
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
                filterDueDateOptionValue: 0,
                filterPriorityOptionValue: 0,
                filterSectorOptionValue: 0,
                filterTypeOptionValue: 0,
                filterStatusOptionValue: 0,
                filterBookmarked: '',
                filterDueDate: 'All',
                filterPriority: '',
                filterSector: '',
                filterType: '',
                filterStatus: '',
                greaterThan: '',
                greaterThanValue: '',
                lowerThan: '',
                lowerThanValue: ''},
                () => this.getListOfWorkOrders()
            );
        }
        if (this.state.sortBy !== prevState.sortBy || this.state.ordering !== prevState.ordering) {
            this.setState({
                data: []},
                () => this.getListOfWorkOrders()
            );
        }
        if (this.state.isFiltering !== prevState.isFiltering) {
            this.setState({
                data: [],
                pageNumber: 1,
                isEmpty: false,
                lastPage: false},
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
            this.state.filterBookmarked, this.state.filterPriority, this.state.filterSector, this.state.filterType, this.state.filterStatus, 
            this.state.greaterThan, this.state.greaterThanValue, this.state.lowerThan, this.state.lowerThanValue)
        .then((response) => {
            this.setState({
                workOrders: response.data.filter((workOrder) =>
                    workOrder.workOrderStatus.status !== WorkOrderStatus.CANCELLED &&
                    workOrder.workOrderStatus.status !== WorkOrderStatus.COMPLETED)
                    .map((workOrder) => ({
                        id: workOrder.id,
                        title: workOrder.title,
                        cause: workOrder.cause,
                        notification: workOrder.notification,
                        location: workOrder.location,
                        type: workOrder.workOrderType.type,
                        priority: workOrder.priorityType.type,
                        sectorType: workOrder.sector.type,
                        sectorKind: workOrder.sector.kind,
                        dueDate: workOrder.dueDate,
                        createdDate: workOrder.createdDate,
                        lastModifiedDate: workOrder.lastModifiedDate,
                        lastModifiedBy: workOrder.lastModifiedBy,
                        dateCompleted: workOrder.dateCompleted,
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
            console.log(err.response);
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

    toggleDueDateOption = (value) => {
        this.setState({
            filterDueDateOptionValue: value
        });
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

    toggleTypeOption = (value) => {
        this.setState({
            filterTypeOptionValue: value
        });
    }

    toggleStatusOption = (value) => {
        this.setState({
            filterStatusOptionValue: value
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

    handleCancelDueDateFilter = () => {
        this.state.dueDateOptions.map(option => {
            if (this.state.filterDueDate === option.label) {
                this.setState({
                    filterDueDateOptionValue: option.value
                });
            }
        });
        this.toggleDueDateModal()
    }

    handleCancelPriorityFilter = () => {
        this.state.priorityOptions.map(option => {
            if (this.state.filterPriority === '') {
                this.setState({
                    filterPriorityOptionValue: 0
                });
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
                });
            } else if (this.state.filterSector.replace(/_/g, ' ') === option.label) {
                this.setState({
                    filterSectorOptionValue: option.value
                });
            }
        });
        this.toggleSectorModal()
    }

    handleCancelTypeFilter = () => {
        this.state.typeOptions.map(option => {
            if (this.state.filterType === '') {
                this.setState({
                    filterTypeOptionValue: 0
                });
            } else if (this.state.filterType === 'cm') {
                this.setState({
                    filterTypeOptionValue: 1
                });
            } else if (this.state.filterType === 'pm') {
                this.setState({
                    filterTypeOptionValue: 2
                });
            }
        });
        this.toggleTypeModal()
    }

    handleCancelStatusFilter = () => {
        this.state.statusOptions.map(option => {
            if (this.state.filterSector === '') {
                this.setState({
                    filterStatusOptionValue: 0
                });
            } else if (this.state.filterStatus.replace(/_/g, ' ') === option.label) {
                this.setState({
                    filterSectorOptionValue: option.value
                });
            }
        });
        this.toggleStatusModal()
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

    handleApplyDueDateFilter = () => {
        this.state.dueDateOptions.map(option => {
            if (this.state.filterDueDateOptionValue === 0) {
                this.setState({
                    greaterThan: '',
                    greaterThanValue: '',
                    lowerThan: '',
                    lowerThanValue: '',
                    filterDueDate: 'All'
                });
            } else if (this.state.filterDueDateOptionValue === 1) {
                this.setState({
                    greaterThan: '',
                    greaterThanValue: '',
                    lowerThan: 'dueDate',
                    lowerThanValue: "'" + moment(this.state.today).format("YYYY-MM-DD hh:mm") + "'",
                    filterDueDate: 'Past Due'
                });
            } else if (this.state.filterDueDateOptionValue === 2) {
                this.setState({
                    greaterThan: 'dueDate',
                    greaterThanValue: "'" + moment(this.state.today).startOf('day').format("YYYY-MM-DD hh:mm") + "'",
                    lowerThan: 'dueDate',
                    lowerThanValue: "'" + moment(this.state.today).add(1, 'days').format("YYYY-MM-DD hh:mm") + "'",
                    filterDueDate: 'Today'
                });
            } else if (this.state.filterDueDateOptionValue === 3) {
                this.setState({
                    greaterThan: 'dueDate',
                    greaterThanValue: "'" + moment(this.state.today).format("YYYY-MM-DD hh:mm") + "'",
                    lowerThan: 'dueDate',
                    lowerThanValue: "'" + moment(this.state.today).endOf('week').format("YYYY-MM-DD hh:mm") + "'",
                    filterDueDate: 'This Week'
                });
            } else if (this.state.filterDueDateOptionValue === 4) {
                this.setState({
                    greaterThan: 'dueDate',
                    greaterThanValue: "'" + moment(this.state.today).format("YYYY-MM-DD hh:mm") + "'",
                    lowerThan: 'dueDate',
                    lowerThanValue: "'" + moment(this.state.today).endOf('month').format("YYYY-MM-DD hh:mm") + "'",
                    filterDueDate: 'This Month'
                });
            } else if (this.state.filterDueDateOptionValue === 5) {
                this.setState({
                    greaterThan: 'dueDate',
                    greaterThanValue: "'" + moment(this.state.today).format("YYYY-MM-DD hh:mm") + "'",
                    lowerThan: 'dueDate',
                    lowerThanValue: "'" + moment(this.state.today).endOf('year').format("YYYY-MM-DD hh:mm") + "'",
                    filterDueDate: 'This Year'
                });
            }
        });
        this.setState({
            isFiltering: !this.state.isFiltering},
            () => this.toggleDueDateModal()
        );
    }

    handleApplyPriorityFilter = () => {
        this.state.priorityOptions.map(option => {
            if (this.state.filterPriorityOptionValue === 0) {
                this.setState({
                    filterPriority: ''
                });
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

    handleApplyTypeFilter = () => {
        this.state.typeOptions.map(option => {
            if (this.state.filterTypeOptionValue === 0) {
                this.setState({
                    filterType: ''
                });
            } else if (this.state.filterTypeOptionValue === 1) {
                this.setState({
                    filterType: 'cm'
                });
            } else if (this.state.filterTypeOptionValue === 2) {
                this.setState({
                    filterType: 'pm'
                });
            }
        });
        this.setState({
            isFiltering: !this.state.isFiltering},
            () => this.toggleTypeModal()
        );
    }

    handleApplyStatusFilter = () => {
        this.state.statusOptions.map(option => {
            if (this.state.filterStatusOptionValue === 0) {
                this.setState({
                    filterStatus: ''
                })
            } else if (this.state.filterStatusOptionValue === option.value) {
                this.setState({
                    filterStatus: option.label.replace(/ /g, '_')
                });
            }
        });
        this.setState({
            isFiltering: !this.state.isFiltering},
            () => this.toggleStatusModal()
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
    };

    deleteWorkOrder = async(workOrderId) => {
        Alert.alert('Delete Work Order',
            `Are you sure you want to delete this Work Order?`,
            [
                {text: 'Cancel', onPress: () => {}},
                {text: 'Delete', onPress: () => this.confirmDeleteWorkOrder(workOrderId)}
            ]);
    };

    confirmDeleteWorkOrder = async(workOrderId) => {
        await updateWorkOrderById(workOrderId,
            { workOrderStatus: WorkOrderStatus.CANCELLED,
                        lastModifiedDate: new Date(),
                        lastModifiedBy: {id : this.state.user.id}
            });
        this.setState({
            data: []
        });
        this.getListOfWorkOrders();
    };

    completeWorkOrder = async(workOrderId) => {
        Alert.alert('Complete Work Order',
            `Are you sure you want to complete this Work Order?`,
            [
                {text: 'Cancel', onPress: () => {}},
                {text: 'Complete', onPress: () => this.confirmCompleteWorkOrder(workOrderId)}
            ]);
    };

    confirmCompleteWorkOrder = async(workOrderId) => {
        await updateWorkOrderById(workOrderId,
            { workOrderStatus: WorkOrderStatus.COMPLETED,
                dateCompleted: new Date(),
                lastModifiedBy: {id : this.state.user.id}
            });
        this.setState({
            data: []
        });
        this.getListOfWorkOrders();
    };

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
                    toggleDueDateOption={this.toggleDueDateOption}
                    togglePriorityOption={this.togglePriorityOption}
                    toggleSectorOption={this.toggleSectorOption}
                    toggleTypeOption={this.toggleTypeOption}
                    toggleStatusOption={this.toggleStatusOption}
                    handleCancelBookmarkedFilter={this.handleCancelBookmarkedFilter}
                    handleCancelDueDateFilter={this.handleCancelDueDateFilter}
                    handleCancelPriorityFilter={this.handleCancelPriorityFilter}
                    handleCancelSectorFilter={this.handleCancelSectorFilter}
                    handleCancelTypeFilter={this.handleCancelTypeFilter}
                    handleCancelStatusFilter={this.handleCancelStatusFilter}
                    handleApplyBookmarkedFilter={this.handleApplyBookmarkedFilter}
                    handleApplyDueDateFilter={this.handleApplyDueDateFilter}
                    handleApplyPriorityFilter={this.handleApplyPriorityFilter}
                    handleApplySectorFilter={this.handleApplySectorFilter}
                    handleApplyTypeFilter={this.handleApplyTypeFilter}
                    handleApplyStatusFilter={this.handleApplyStatusFilter}
                    deleteWorkOrder={this.deleteWorkOrder}
                    completeWorkOrder={this.completeWorkOrder}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    property: state.property.property,
    reloadWorkOrders: state.workOrder.reloadWorkOrders
});

const mapDispatchToProps = dispatch => ({
    finishReloadingWorkOrders: () => dispatch(reloadWorkOrders(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobListPage);
