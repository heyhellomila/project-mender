import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
import { styles, jobListTable } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { Table, Row, Col } from 'react-native-table-component';
import { getWorkOrdersByPropertyId } from '../apis/workOrders/GetWorkOrder';
import { WorkOrderPage } from '../pages/WorkOrderPage';

class JobListPage extends React.Component {
    static navigationOptions = {
        draweLabel: 'Job List Page',
    };
    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            property: this.props.property,
            displayModal: false,
            tableHead: ['W.O #', 'Title', 'Type', 'Sector'],
            workOrders: [],
            tableData: [],
            loading: true,
            error: false,
            attributeOrder: "W.O #",
            ascending: true
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
        await getWorkOrdersByPropertyId(this.props.property.id).then((response) => {
            this.setState({
                workOrders: response.data.map((workOrder) => ({
                    id: workOrder._id,
                    title: workOrder.title,
                    type: workOrder.type,
                    sector: workOrder.sector
                }))
            }, () => this.transformData());
        }).catch((err) => {
            this.setState({error: true, loading: false, errorMsg: err.message})
        });
    }

    openModal() {
        this.setState(prevState => {
            return {
                displayModal: true
            }
        });
    }

    closeModal = () => {
        this.setState(prevState => {
            return {
                displayModal: false
            }
        })
    }

    openWorkModal = () => {
        this.openModal();
    }

    transformData = () => {
        const { workOrders } = this.state;
        var data = [];
        workOrders.forEach((workOrder) => {
            data.push([workOrder.id, workOrder.title, workOrder.type, workOrder.sector]);
        });
        this.setState({tableData: data, loading: false});
    }

    sortWorkOrders = (attribute) => {
        console.log("sort");
        ascending = false;
        (attribute === this.state.atrribute) ? ascending = !this.state.ascending : ascending = true;
        sortedOrders = [].concat(this.state.workOrders);
        switch (attribute) {
            case "W.O #":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x._id < y._id)
                : sortedOrders = sortedOrders.sort((x, y) => x._id > y._id)
                break;
            case "Title":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.title < y.title)
                : sortedOrders = sortedOrders.sort((x, y) => x.title > y.title)
                break; 
            case "Type":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.type < y.type)
                : sortedOrders = sortedOrders.sort((x, y) => x.type > y.type)
                break; 
            case "Sector":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.sector < y.sector)
                : sortedOrders = sortedOrders.sort((x, y) => x.sector > y.sector)
                break; 
            default:
                sortedOrders = this.state.workOrders;
        }
        this.setState({attribute: attribute, ascending: ascending, workOrders: sortedOrders});
        this.transformData();
    }

    renderJobList() {
        const { tableHead, loading, tableData} = this.state;
        const { navigate }  = this.props.navigation;
        return (
            <View>
                <CommonHeader user={this.state.user} />
                {loading 
                    ?   <Text>Loading...</Text>
                    :   <View>
                            <View style={jobListTable.jobListTableContainer}>
                                <Text>JOB LIST</Text>
                                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                    <Row data={tableHead} style={jobListTable.jobListTablehead} textStyle={styles.text}>
                                        {
                                            tableHead.map(function(header) {
                                                return (
                                                    <TouchableOpacity
                                                        key={header}
                                                        onPress={() => {this.sortWorkOrders(header)}}> 
                                                        {/* onPress not working */}
                                                        <Col data={header} />
                                                    </TouchableOpacity>
                                                )
                                                
                                            })
                                        }
                                    </Row>
                                    {
                                        tableData.map(function(workOrder) {
                                            return (
                                            <TouchableOpacity
                                                key={workOrder[0]}
                                                onPress={() => navigate("WorkOrderPage", {workOrderId: workOrder[0]})}>
                                                <Row data={workOrder} style={jobListTable.jobListTabletext} />
                                            </TouchableOpacity>
                                            )
                                        })
                                    }
                                </Table>
                            </View>
                        </View>
                }
            </View>
        );
    }

    render() {
        const { tableHead, loading, tableData} = this.state;
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
