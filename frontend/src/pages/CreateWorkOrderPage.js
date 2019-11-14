import React from 'react';
import { View, Platform, StatusBar, SafeAreaView, Button, TouchableOpacity, Text } from 'react-native';
import { createWorkOrder } from '../apis/workOrders/CreateWorkOrder';
import { connect } from 'react-redux';
import NoAccessComponent from '../components/NoAccessComponent';
import ChooseSector from '../components/workOrderForm/ChooseSector';
import GeneralInfo from '../components/workOrderForm/GeneralInfo';
import Header from '../components/workOrderForm/Header';

class CreateWorkOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1,
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
            today: new Date(),
            property: props.property
        };

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

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }
    
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
            alert(err.message);
        }
    }

    handleSector = (value) => {
        this.setState({sector: value});
    }

    handleType = (value) => {
        console.log(value);
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
        if (!property) {
            return(
                <NoAccessComponent 
                    errorMessage={'You must have a registered property to create a work order.'}
                    navigation={this.props.navigation}/>
            );
        } else {
            switch(step) {
                case 1:
                    return(
                        <View>
                            <Header {...this.state} headerText={"Pick a sector"}/>
                            <ChooseSector {...this.state} handleSector={this.handleSector} 
                                nextStep={this.nextStep}/>
                        </View>
                    );
                case 2: 
                    return(
                        <SafeAreaView style={{paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0 }}>
                            <Header {...this.state} headerText={"General information"}></Header>
                            <GeneralInfo {...this.state} handleTitle={this.handleTitle}
                                handleCause={this.handleCause} nextStep={this.nextStep} 
                                prevStep={this.prevStep} handleType={this.handleType}/>
                        </SafeAreaView>
                    );
                case 3: 
                        return(
                            <SafeAreaView style={{paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0 }}>
                                <Header {...this.state} headerText={"General information"}></Header>
                                <Button 
                                    title="Submit"
                                    onPress={()=> this.handleWorkOrder()} 
                                ></Button>
                            </SafeAreaView>
                        )
            }
        }
        // <CreateWorkOrderComponent {...this.state}
        //     correctiveStyle = {this.correctiveStyle} preventiveStyle = {this.preventiveStyle} 
        //     handleWorkOrder = {this.handleWorkOrder} toggleCorrective = {this.toggleCorrective}
        //     togglePreventive = {this.togglePreventive} handleSector={this.handleSector} 
        //     handleCause = {this.handleCause} handleDescription = {this.handleDescription} 
        //     handlePriority = {this.handlePriority} handleTitle = {this.handleTitle} 
        //     toggleServiceNeeded = {this.toggleServiceNeeded} 
        //     handleDueDate = {this.handleDueDate}/>
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps, null)(CreateWorkOrderPage);
