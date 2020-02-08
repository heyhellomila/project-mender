import React from 'react';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder';
import { connect } from 'react-redux';
import NoAccessComponent from '../components/NoAccessComponent';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import WorkOrderForm from '../components/workOrderForm/WorkOrderForm';
import {SectorType} from "../constants/enums/SectorType";
import {formStyles, sectorStyles} from "../stylesheets/CreateWorkOrderPageStyleSheet";
import { reloadWorkOrders } from '../redux/actions';

class CreateWorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            sectorType: '',
            sectorKind: '',
            type: 'CM', 
            title: '',
            cause: null,
            serviceNeeded: false, 
            priority: 'MEDIUM', 
            description: '',
            dueDate: new Date(),
            priceEstimate: 0,
            navigation: props.navigation,
            today: new Date(),
            property: props.property,
            validTitle: true,
            submitting: false,
            success: false,
            headerText: 'Select a Sector'
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
                headerText: SectorType[this.state.sectorType].display
            });
        } else if (step === 2) {
            this.setState({
                step: step + 1,
                headerText: 'Overview'
            });
        } else if (step === 3) {
            if (title.length === 0) {
                this.setState({
                    validTitle: title.length !== 0,
                });
            } else {
                this.setState({
                    validTitle: true,
                    step: step + 1,
                    headerText: 'Details'
                });
            }
        } 
    };

    prevStep = () => {
        const { step } = this.state;

        if (step === 2) {
            this.setState({
                step: step - 1,
                sectorType: '',
                headerText: 'Select a Sector'
            });
        } else if (step === 3) {
            this.setState({
                step: step - 1,
                sectorKind: '',
                headerText: SectorType[this.state.sectorType].display
            });
        } else if (step === 4) {
            this.setState({
                step: step - 1,
                headerText: 'Overview'
            });
        }
    };
    
    handleWorkOrder = async() => {
        try {
            let { description } = this.state;
            if (description.length === 0) {
                description = 'N/A';
            }
            this.setState({submitting: true});
            await createWorkOrder(
                this.props.property.id,
                this.state.sectorKind,
                this.state.type,
                this.state.title,
                this.state.cause,
                this.state.serviceNeeded,
                this.state.priority,
                description,
                Date.parse(this.state.dueDate),
                this.state.priceEstimate).then(async() => {
                    this.setState({success: true, submitting: false});
                    this.props.reloadWorkOrders();
                    setTimeout(() => {
                        this.props.navigation.goBack(null);
                    }, 1500);
                });
        } catch (err) {
            this.setState({submitting: false});
            alert(err.message);
        }
    };

    handleSectorType = (value) => {
        this.setState({sectorType: value}, () => this.nextStep());
    };

    handleSectorKind = (value) => {
        this.setState({sectorKind: value}, () => this.nextStep());
    };

    handleType = (value) => {
        this.setState({type: value});
    };

    handleTitle = (value) => {
        this.setState({title: value});
    };

    handleCause = (value) => {
        this.setState({cause: value});
    };

    toggleServiceNeeded = (value) => {
        this.setState({serviceNeeded: value});
    };

    handleDescription = (value) => {
        this.setState({description: value});
    };

    handlePriority = (value) => {
        this.setState({priority: value});
    };

    handleDueDate = (value) => {
        this.setState({dueDate: value});
    };

    render() {
        const { property } = this.props;
        return (
            <View style={{flex: 1}}> 
                {!property 
                    ? <NoAccessComponent
                        errorMessage={'You must have a registered property to create a work order.'}
                        navigation={this.props.navigation}/>
                    : <WorkOrderForm {...this.state} handleTitle={this.handleTitle}
                        handleCause={this.handleCause} nextStep={this.nextStep} 
                        prevStep={this.prevStep} handleType={this.handleType}
                        handleSectorType={this.handleSectorType} handleSectorKind={this.handleSectorKind}
                        toggleServiceNeeded={this.toggleServiceNeeded} handlePriority={this.handlePriority}
                        handleDescription={this.handleDescription} submit={this.handleWorkOrder}
                        handleDueDate={this.handleDueDate}/>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    property: state.property.property
});

const mapDispatchToProps = dispatch => ({
    reloadWorkOrders: () => dispatch(reloadWorkOrders(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkOrderPage);
