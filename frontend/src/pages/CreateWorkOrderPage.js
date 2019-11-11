import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder';
import { connect } from 'react-redux';
import { createWorkOrderComponent } from '../stylesheets/CreateWorkOrderPageStyleSheet';
import CreateWorkOrderComponent from '../components/CreateWorkOrderComponent';
import NoAccessComponent from '../components/NoAccessComponent';

class CreateWorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sector: 'ROOF',
            type: 'IMP', 
            title: 'untitled', 
            cause: 'no cause', 
            serviceNeeded: false, 
            priority: 'MEDIUM', 
            description: 'no description', 
            dueDate: '2020-11-07T03:54:52.130+00:00',
            priceEstimate: 0,
            navigation: props.navigation,
            today: new Date()
        };

        this.preventiveStyle = this.preventiveStyle.bind(this);
        this.correctiveStyle = this.correctiveStyle.bind(this);
        this.handleWorkOrder = this.handleWorkOrder.bind(this);
        this.toggleCorrective = this.toggleCorrective.bind(this);
        this.togglePreventive = this.togglePreventive.bind(this);
        this.handleSector = this.handleSector.bind(this);
        this.handleCause = this.handleCause.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePriority = this.handlePriority.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.toggleServiceNeeded = this.toggleServiceNeeded.bind(this);
        this.handleDueDate = this.handleDueDate.bind(this);
    }
    static navigationOptions = {
        title: 'Create Work Order',
    };
    
    handleWorkOrder = async() => {
        try {
            await createWorkOrder(
                this.props.property.id,
                this.state.sector,
                this.state.type,
                this.state.title,
                this.state.cause,
                this.state.serviceNeeded,
                this.state.priority,
                this.state.description,
                this.state.dueDate,
                this.state.priceEstimate).then(async() => {
                        this.props.navigation.goBack(null);
                });
        } catch (err) {
            alert(err.message)
        }
    }

    toggleCorrective = () => {
        if(this.state.type == 'CM'){
            this.setState({type: 'IMP'});
        }
        else{
            this.setState({type: 'CM'});
        }

    }

    togglePreventive = () => {
        if(this.state.type == 'PM'){
            this.setState({type: 'IMP'});
        }
        else{
            this.setState({type: 'PM'});
        }

    }

    handleSector = (value) => {
        this.setState({sector: value});
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

    correctiveStyle = function() {
        if(this.state.type === 'CM'){
            return createWorkOrderComponent.selectedGray;
        }
        else{
            return createWorkOrderComponent.unselectedGray;
        }
    }

    preventiveStyle = function() {
        if(this.state.type === 'PM'){
            return createWorkOrderComponent.selectedGray;
        }
        else{
            return createWorkOrderComponent.unselectedGray;
        }
    }

    handleDueDate = (value) => {
        this.setState({dueDate: Date.parse(value)});
    }

    render() {
        return (
          <KeyboardAvoidingView>
            {this.props.property 
                ? <CreateWorkOrderComponent {...this.state}
                    correctiveStyle = {this.correctiveStyle} preventiveStyle = {this.preventiveStyle} 
                    handleWorkOrder = {this.handleWorkOrder} toggleCorrective = {this.toggleCorrective}
                    togglePreventive = {this.togglePreventive} handleSector={this.handleSector} 
                    handleCause = {this.handleCause} handleDescription = {this.handleDescription} 
                    handlePriority = {this.handlePriority} handleTitle = {this.handleTitle} 
                    toggleServiceNeeded = {this.toggleServiceNeeded} 
                    handleDueDate = {this.handleDueDate}/>
                : <NoAccessComponent 
                    errorMessage={'You must have a registered property to create a work order.'}
                    navigation={this.props.navigation}/>
            }
          </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps, null)(CreateWorkOrderPage);
