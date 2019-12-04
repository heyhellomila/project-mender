import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
import { styles, jobListTable, headerStyles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrder';
import { WorkOrderPage } from '../pages/WorkOrderPage';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            loading: true,
            error: false,
            attributeOrder: 'W.O #',
            ascending: true,
            pageSize: 10,
            pageNumber: 1
        };
        this.sortWorkOrders = this.sortWorkOrders.bind(this);
    }
  
    componentDidUpdate(prevProps) {
        if (this.props.property !== prevProps.property) {
          this.setWorkOrders();
        }
    }

    componentDidMount() {
        this.setWorkOrders()
    }

    async setWorkOrders() {
        await getWorkOrders(this.props.property.id, this.state.pageSize, this.state.pageNumber).then((response) => {
            this.setState({
                workOrders: response.data.map((workOrder) => ({
                    id: workOrder.id,
                    title: workOrder.title,
                    type: workOrder.workOrderType.type,
                    priority: workOrder.priorityType.type,
                    dueDate: workOrder.dueDate
                }))
            }, () => this.transformData());
        }).catch((err) => {
            this.setState({error: true, loading: false, errorMsg: err.message})
        });
    }

    transformData = () => {
        const { workOrders } = this.state;
        var data = [];
        workOrders.forEach((workOrder) => {
            data.push([workOrder.id, workOrder.title, workOrder.type, workOrder.priority, workOrder.dueDate]);
        });
        this.setState({data: data, loading: false});
    }

    handlePageEnd = () => {
        this.setState(state => ({pageNumber: state.page + 1}), () => this.setWorkOrders());
    }

    sortWorkOrders = (attribute) => {
        ascending = false;
        (attribute === this.state.attributeOrder) ? ascending = !this.state.ascending : ascending = true;
        sortedOrders = this.state.workOrders;
        switch (attribute) {
            case "W.O #":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x._id < y._id)
                : sortedOrders = sortedOrders.sort((x, y) => x._id > y._id)
                console.log("sorting W.O #");
                break;
            case "Title":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.title < y.title)
                : sortedOrders = sortedOrders.sort((x, y) => x.title > y.title)
                console.log("sorting title");
                break; 
            case "Type":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.type < y.type)
                : sortedOrders = sortedOrders.sort((x, y) => x.type > y.type)
                console.log("sorting type");
                break; 
            case "Sector":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.sector < y.sector)
                : sortedOrders = sortedOrders.sort((x, y) => x.sector > y.sector)
                console.log("sorting sector");
                break; 
            default:
                sortedOrders = this.state.workOrders;
        }
        this.setState({attributeOrder: attribute, ascending: ascending, workOrders: sortedOrders});
        this.transformData();
    }

    renderJobListHeader() {
    }

    renderJobList() {
        const { loading, data, workOrders } = this.state;
        const { navigate } = this.props.navigation;
        return (
            <View>
                <CommonHeader user={this.state.user} />
                
                <View style={jobListTable.jobListTableContainer}>
                    {
                        workOrders.map((workOrder, i) => (
                        <TouchableOpacity
                            key={workOrder[0]}
                            onPress={() => navigate("WorkOrderPage", {workOrderId: workOrder[0]})}>
                            <Card>
                                <Text>{workOrder.dueDate}</Text>
                                <Text>{workOrder.title}</Text>
                                <Text>{workOrder.priority}</Text>
                                <Text># {workOrder.id}</Text>
                                <Text>{workOrder.type}</Text>
                            </Card>
                        </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        );
    }

    render() {
        const { loading, data} = this.state;
        return (
            <ScrollView styles={styles.container}>
                {this.renderJobList()}
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
