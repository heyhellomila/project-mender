import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
import { styles, jobListTable } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { Table, Row, Rows } from 'react-native-table-component';
import { getWorkOrdersByPropertyId } from '../apis/workOrders/GetWorkOrder';

class JobListPage extends React.Component {
    static navigationOptions = {
        draweLabel: 'Job List Page',
    };
    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            displayModal: false,
            tableHead: ['W.O #', 'Title', 'Type', 'Sector'],
            workOrders: [],
            tableData: [],
            loading: true,
            error: false
        };
    }

   async componentDidMount() {
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

    sortWorkOrders = (attribute, ascending) => {
        const sortedOrders = [].concat(this.state.workOrders);
        switch (attribute) {
            case "id":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x._id < y._id)
                : sortedOrders = sortedOrders.sort((x, y) => x._id > y._id)
                break;
            case "title":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.title < y.title)
                : sortedOrders = sortedOrders.sort((x, y) => x.title > y.title)
                break; 
            case "type":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.type < y.type)
                : sortedOrders = sortedOrders.sort((x, y) => x.type > y.type)
                break; 
            case "sector":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.sector < y.sector)
                : sortedOrders = sortedOrders.sort((x, y) => x.sector > y.sector)
                break; 
            default:
                sortedOrders = this.state.workOrders;
        }
        this.setState({workOrders: sortedOrders});
        this.transformData();
    }

    renderJobList() {
        const { tableHead, loading, tableData} = this.state;
        return (
            <View>
                <CommonHeader user={this.state.user} />
                {loading 
                    ?   <Text>Loading...</Text>
                    :   <View>
                            <View style={jobListTable.jobListTableContainer}>
                                <Text>JOB LIST</Text>
                                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                    <Row data={tableHead} style={jobListTable.jobListTablehead} textStyle={styles.text} />
                                    {
                                        tableData.map(function(workOrder) {
                                            return (
                                            <TouchableOpacity
                                                key={workOrder[0]}
                                                onPress={() => {console.log(workOrder[0]); /* Navigate to WorkOrderPage. Send either workOrder or just its id */}}>
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
