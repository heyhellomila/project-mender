import React from 'react';
import { ScrollView, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { styles, headerStyles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrderById } from '../apis/workOrders/GetWorkOrder';

class WorkOrderPage extends React.Component {

    static navigationOptions = {
        draweLabel: 'Work Order Page',
    };
    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            displayModal: false,
            workOrderId: this.props.navigation.getParam('workOrderId', null),
            workOrder: [],
            loading: true,
            error: false
        };
    }

    async componentDidMount() {
        await getWorkOrderById(this.state.workOrderId).then((response) => {
            this.setState({
                workOrder: response.data
            });
        }).catch((err) => {
            this.setState({error: true, loading: false, errorMsg: err.message})
        });
    }

    render() {
        const { loading, workOrder } = this.state;
        const { navigate }  = this.props.navigation;
        return (
            <ScrollView styles={styles.container}>
                {/* <CommonHeader user={this.state.user} /> */}
                <View style={headerStyles.commonHeaderComponent}>
                    <View style={headerStyles.commonHeaderTextComponent}><Text style={headerStyles.commonHeaderText}>W.O # {workOrder._id}</Text></View>
                    <Button title={'Back'} onPress={() => navigate('JobListPage')}></Button>
                </View>
                <View>
                    {/* <Text>Work Order Id: {workOrder._id}</Text> */}
                    <Text>Property Id: {this.props.property.name}</Text>
                    <Text>Sector: {workOrder.sector}</Text>
                    <Text>Type: {workOrder.type}</Text>
                    <Text>Title: {workOrder.title}</Text>
                    <Text>Cause: {workOrder.cause}</Text>
                    <Text>Priority: {workOrder.priority}</Text>
                    <Text>Description: {workOrder.description}</Text>
                    <Text>Service Needed: {workOrder.service_needed}</Text>
                    <Text>Due Date: {workOrder.due_date}</Text>
                    <Text>Price Estimate: {workOrder.price_estimate}</Text>
                </View>
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
    property: state.property.property,
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderPage);