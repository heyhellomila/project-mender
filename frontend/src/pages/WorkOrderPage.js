import React from 'react';
import { ScrollView, Text, View, } from 'react-native';
import { connect } from 'react-redux';
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
            workOrder: null,
            loading: true,
            error: false
        };
    }

    async componentDidMount() {
        // await getWorkOrderById(/* id passed from list */).then((response) => {
        //     this.setState({
        //         workOrder = response.data
        //     });
        // }).catch((err) => {
        //     this.setState({error: true, loading: false, errorMsg: err.message})
        // });
    }

    render() {
        const { workOrder } = this.state;
        return (
            <ScrollView styles={styles.container}>
                <CommonHeader user={this.state.user} />
                {loading 
                    ?   <Text>Loading...</Text>
                    :   <View>
                            {/* Display current work order */}
                            <Text>Work Order Id: {workOrder._id}</Text>
                        </View>
                }
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