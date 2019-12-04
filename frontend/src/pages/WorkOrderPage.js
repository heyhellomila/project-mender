import React from 'react';
import { ScrollView, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { styles, headerStyles } from '../stylesheets/Stylesheet';
import { getWorkOrderById } from '../apis/workOrders/GetWorkOrder';
import { getPropertyById } from '../apis/properties/GetProperty';

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
            property: this.props.property,
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
        const { loading, workOrder, property } = this.state;
        const { navigate }  = this.props.navigation;
        return (
            <ScrollView styles={styles.container}>
                <View style={headerStyles.commonHeaderComponent}>
                    <View style={headerStyles.commonHeaderTextComponent}><Text style={headerStyles.commonHeaderText}>W.O # {workOrder.id}</Text></View>
                    <Button title={'Back to Job List for ' + property.name} onPress={() => navigate('JobListPage')}></Button>
                </View>
                <View>
                    <Text>Property: {property.name}</Text>
                    <Text>Sector: {workOrder.sector}</Text>
                    <Text>Title: {workOrder.title}</Text>
                    <Text>Cause: {workOrder.cause}</Text>
                    <Text>Priority: {workOrder.priority}</Text>
                    <Text>Description: {workOrder.description}</Text>
                    <Text>Service Needed: {workOrder.serviceNeeded}</Text>
                    <Text>Due Date: {workOrder.dueDate}</Text>
                    <Text>Price Estimate: {workOrder.priceEstimate}</Text>
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