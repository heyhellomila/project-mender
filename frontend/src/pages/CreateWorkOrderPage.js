import React from 'react';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder';
import { connect } from 'react-redux';
import NoAccessComponent from '../components/NoAccessComponent';
import { View } from 'react-native';
import WorkOrderForm from '../components/workOrderForm/WorkOrderForm';

class CreateWorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            sector: 'ROOF',
            type: 'CM', 
            title: '', 
            cause: '', 
            serviceNeeded: false, 
            priority: 'MEDIUM', 
            description: '', 
            dueDate: '2020-11-07T03:54:52.130+00:00',
            priceEstimate: 0,
            navigation: props.navigation,
            today: new Date(),
            property: props.property,
            validTitle: true,
            validCause: true,
            submitting: false,
            success: false,
            headerText: 'Pick a sector'
        };
    }
    static navigationOptions = {
        title: 'Create Work Order',
    };

    nextStep = () => {
        const { step, title, cause } = this.state;
        if (step === 1) {
            this.setState({
                step: step + 1,
                headerText: 'Overview'
            });
        } else if (step === 2) {
            if (title.length === 0 || cause.length === 0) {
                this.setState({
                    validTitle: title.length !== 0,
                    validCause: cause.length !== 0
                });
            } else {
                this.setState({
                    validTitle: true,
                    validCause: true,
                    step: step + 1,
                    headerText: 'Pick a sector'
                });
            }
        } 
    }

    prevStep = () => {
        const { step } = this.state;

        if (step === 2) {
            this.setState({
                step: step - 1,
                headerText: 'Pick a sector'
            });
        } else if (step === 3) {
            this.setState({
                step: step - 1,
                headerText: 'Overview'
            });
        } 
    }
    
    handleWorkOrder = async() => {
        try {
            var { description } = this.state;
            if (description.length === 0) {
                description = 'N/A';
            }
            this.setState({submitting: true});
            await createWorkOrder(
                this.props.property.id,
                this.state.sector,
                this.state.type,
                this.state.title,
                this.state.cause,
                this.state.serviceNeeded,
                this.state.priority,
                description,
                this.state.dueDate,
                this.state.priceEstimate).then(async() => {
                    this.setState({success: true, submitting: false});
                    setTimeout(() => {
                        this.props.navigation.goBack(null);
                    }, 1500);
                });
        } catch (err) {
            this.setState({submitting: false});
            alert(err.message);
        }
    }

    handleSector = (value) => {
        this.setState({sector: value});
    }

    handleType = (value) => {
        this.setState({type: value});
    }

    handleTitle = (value) => {
        this.setState({title: value});
    }
    
    handleCause = (value) => {
        this.setState({cause: value});
    }

    toggleServiceNeeded = (value) => {
        this.setState({serviceNeeded: value});
    }

    handleDescription = (value) => {
        this.setState({description: value});
    }

    handlePriority = (value) => {
        this.setState({priority: value});
    }

    handleDueDate = (value) => {
        this.setState({dueDate: Date.parse(value)});
    }

    render() {
        const { property } = this.props;
        const { step } = this.state;
        return (
            <View style={{flex: 1}}> 
                {!property 
                    ? <NoAccessComponent
                        errorMessage={'You must have a registered property to create a work order.'}
                        navigation={this.props.navigation}/>
                    : <WorkOrderForm {...this.state} handleTitle={this.handleTitle}
                        handleCause={this.handleCause} nextStep={this.nextStep} 
                        prevStep={this.prevStep} handleType={this.handleType}
                        handleSector={this.handleSector} toggleServiceNeeded={this.toggleServiceNeeded}
                        handlePriority={this.handlePriority} handleDescription={this.handleDescription}
                        submit={this.handleWorkOrder}/>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps, null)(CreateWorkOrderPage);
