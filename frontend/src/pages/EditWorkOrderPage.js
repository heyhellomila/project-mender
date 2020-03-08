import React from 'react';
import { connect } from 'react-redux';
import NoAccessComponent from '../components/NoAccessComponent';
import { View } from 'react-native';
import WorkOrderForm from '../components/workOrderForm/WorkOrderForm';
import { SectorType } from "../constants/enums/SectorType";
import { reloadWorkOrders } from '../redux/actions';
import { updateWorkOrderById } from "../apis/workOrders/updateWorkOrderById";

class EditWorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            dateFormat: 'YYYY-MM-DD',
            oldWorkOrder: this.props.navigation.state.params,
            sectorType: this.props.navigation.state.params.sectorType,
            sectorKind: this.props.navigation.state.params.sectorKind,
            type: this.props.navigation.state.params.type,
            title: this.props.navigation.state.params.title,
            cause: this.props.navigation.state.params.cause,
            notification: this.props.navigation.state.params.notification,
            location: this.props.navigation.state.params.location,
            serviceNeeded: this.props.navigation.state.params.serviceNeeded,
            emergency: this.props.navigation.state.params.emergency,
            priority: this.props.navigation.state.params.priority,
            dueDate: new Date(this.props.navigation.state.params.dueDate),
            priceEstimate: this.props.navigation.state.params.priceEstimate,
            navigation: props.navigation,
            today: new Date(),
            property: props.property,
            validTitle: true,
            submitting: false,
            success: false,
            headerText: 'Select a Type'
        };
    }
    
    static navigationOptions = {
        title: 'Edit Work Order',
    };

    nextStep = () => {
        const { step, title } = this.state;
        if (step === 1) {
            this.setState({
                step: step + 1,
                headerText: 'Select a Sector'
            });
        } else if (step === 2) {
            this.setState({
                step: step + 1,
                headerText: SectorType[this.state.sectorType].display
            });
        } else if (step === 3) {
            this.setState({
                step: step + 1,
                headerText: 'Overview'
            });
        } else if (step === 4) {
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
                type: '',
                headerText: 'Select a Type'
            });
        } else if (step === 3) {
            this.setState({
                step: step - 1,
                sectorType: '',
                headerText: 'Select a Sector'
            });
        } else if (step === 4) {
            this.setState({
                step: step - 1,
                sectorKind: '',
                headerText: SectorType[this.state.sectorType].display
            });
        } else if (step === 5) {
            this.setState({
                step: step - 1,
                headerText: 'Overview'
            });
        }
    };

    handleEditWorkOrder = async() => {
        try {
            this.setState({submitting: true});
            const updatedWorkOrder = this.handleUpdatedWorkOrderFields();
            await updateWorkOrderById(this.state.oldWorkOrder.id, updatedWorkOrder)
                .then(async() => {
                this.setState({success: true, submitting: false});
                this.props.reloadWorkOrders();
                setTimeout(() => {
                    this.props.navigation.navigate('JobListPage')
                }, 1500);
            });
        } catch (err) {
            this.setState({submitting: false});
            alert("Hello1!!" + err.message);
        }
    };

    handleUpdatedWorkOrderFields() {
        let updatedWorkOrder = {};
        if(this.state.oldWorkOrder.title !== this.state.title){
            updatedWorkOrder.title = this.state.title;
        }
        if(this.state.oldWorkOrder.cause !== this.state.cause){
            updatedWorkOrder.cause = this.state.cause;
        }
        if(this.state.oldWorkOrder.notification !== this.state.notification){
            updatedWorkOrder.notification = this.state.notification;
        }
        if(this.state.oldWorkOrder.location !== this.state.location){
            updatedWorkOrder.location = this.state.location;
        }
        if(this.state.oldWorkOrder.type !== this.state.type){
            updatedWorkOrder.type = this.state.type;
        }
        if(this.state.oldWorkOrder.priorityType !== this.state.priority){
            updatedWorkOrder.priorityType = this.state.priority;
        }
        if(this.state.oldWorkOrder.sectorType !== this.state.sectorType){
            updatedWorkOrder.sectorType = this.state.sectorType;
        }
        if(this.state.oldWorkOrder.sectorKind !== this.state.sectorKind){
            updatedWorkOrder.sectorKind = this.state.sectorKind;
        }
        if(this.state.oldWorkOrder.dueDate !== this.state.dueDate){
            updatedWorkOrder.dueDate = Date.parse(this.state.dueDate);
        }
        if(this.state.oldWorkOrder.serviceNeeded !== this.state.serviceNeeded){
            updatedWorkOrder.serviceNeeded = this.state.serviceNeeded;
        }
        if(this.state.oldWorkOrder.priceEstimate !== this.state.priceEstimate){
            updatedWorkOrder.priceEstimate = this.state.priceEstimate;
        }
        return updatedWorkOrder;
    }

    handleSectorType = (value) => {
        this.setState({sectorType: value}, () => this.nextStep());
    };

    handleSectorKind = (value) => {
        this.setState({sectorKind: value}, () => this.nextStep());
    };

    handleType = (value) => {
        this.setState({type: value}, () => this.nextStep());
    };

    handleTitle = (value) => {
        this.setState({title: value});
    };

    handleCause = (value) => {
        this.setState({cause: value});
    };

    handleNotification = (value) => {
        this.setState({notification: value});
    };

    handleLocation = (value) => {
        this.setState({location: value});
    };

    toggleServiceNeeded = (value) => {
        this.setState({serviceNeeded: value});
    };

    toggleEmergency = (value) => {
        this.setState({emergency: value});
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
        return (
            <View style={{flex: 1}}>
                  <WorkOrderForm {...this.state} {...this.props} handleTitle={this.handleTitle}
                    handleCause={this.handleCause} nextStep={this.nextStep}
                    prevStep={this.prevStep} handleType={this.handleType}
                    handleSectorType={this.handleSectorType} handleSectorKind={this.handleSectorKind}
                    toggleServiceNeeded={this.toggleServiceNeeded} handlePriority={this.handlePriority}
                    handleDescription={this.handleDescription} submit={this.handleEditWorkOrder}
                    handleNotification={this.handleNotification} handleDueDate={this.handleDueDate}
                    handleLocation={this.handleLocation} toggleEmergency={this.toggleEmergency}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkOrderPage);
