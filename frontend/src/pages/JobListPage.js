import React from 'react';
import { ScrollView, Text, View, } from 'react-native';
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
            loggingOut: false,
            user: props.user.user,
            property: [],
            displayModal: false,
            tableHead: ['W.O #', 'Name', 'Type', 'Sector'],
            tableData: []
            //tableData: workOrders.forEach(function(value) {tableData.push([value._id, value.title, value.type, value.sector.capitalize()])})
            // tableData: [
            //     ['1000', 'Broken Floor Tile', 'CM', 'Bathroom'],
            //     ['1001', 'Plumbing Pipe Leak', 'CM', 'Kitchen'],
            //     ['1002', 'Gutter Cleaning', 'PM', 'Roof'],
            //     ['1003', 'Inspect Furnace', 'PM', 'Living Room']
            // ]
        };


    }

   async componentDidMount() {
          await getWorkOrdersByPropertyId(this.props.property.id).then((response) => {
            console.log(JSON.stringify(response))

            compressedData = []
            console.log("\ndata: " + JSON.stringify(response.data))
            console.log("\nresponse.data length: " + response.data.length)
            for (var workOrder in response.data) {
                //console.log("wo "+ i+1 + ": " + response.data[i].stringify) -- prints entire response
                //arr = Array(workOrder._id, workOrder.title, workOrder.type, workOrder.sector);
                //[workOrder._id, workOrder["title"], workOrder["type"], workOrder["sector"]]
                //compressedData.push(arr);
                compressedData.push([1,2,3,4]); // -- works
            }
            // console.log("CompressedData: " + compressedData.stringify)

            

            this.setState({
                tableData: compressedData
                // tableData: response.data.map((workOrder, index) => {
                //     [workOrder._id,
                //     workOrder.title,
                //     workOrder.type,
                //     workOrder.sector]
                // })
            });
            // }, () => alert(this.state.tableData));
            console.log(this.state.tableData.stringify)

        }).catch((err) => {
            this.setState({error: true, submitting: false, errorMsg: err.message})
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

    render() {
        const state = this.state;
        return (
            <ScrollView style={styles.container}>
                <CommonHeader user={this.state.user} />
                <View style={jobListTable.jobListTableContainer}>
                    <Text>JOB LIST</Text>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={jobListTable.jobListTablehead} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={jobListTable.jobListTabletext} />
                    </Table>
                </View>
            </ScrollView>
        );
    }
}

//  function WorkOrderData(this) {
//      const tableData = this.state.tableData;
//     if (tableData === [])
//     return <Text>No work orders for this property</Text>;
//     else
//     return <Rows data={state.tableData} textStyle={jobListTable.jobListTabletext} />;
// }

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout()),
    selectProperty: (property) => dispatch(selectProperty(property))
});

const mapStateToProps = state => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps, mapDispatchToProps)(JobListPage);
