import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import AddPropertyComponent from "../components/addPropertyForm/AddPropertyComponent";

class AddPropertyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitting: false,
            name: '',
            address: '',
            propertyType: 'CONDOMINIUM',
            validName: true,
            validAddress: true
        };
    }

    validateFields() {
        const { name, address } = this.state;
        if (!name) {
            this.setState({
                validName: false
            });
        } else {
            this.setState({
                validName: true
            });
        }
        if (!address) {
            this.setState({
                validAddress: false
            });
        } else {
            this.setState({
                validAddress: true
            });
        }
        return (name && address);
    }

    handleCreateProperty = async() => {
        if (this.validateFields()) {
            try {
                this.setState({submitting: true});
                alert('postinnnn');
                //post
            } catch (err) {
                alert(err.message);
            } finally {
                this.setState({submitting: false});
            }
        }
    }

    handleName = (value) => {
        this.setState({
            name: value
        });
    }

    handleAddress = (value) => {
        this.setState({
            address: value
        });
    }

    handlePropertyType = (value) => {
        this.setState({
            propertyType: value
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AddPropertyComponent {...this.state} {...this.props}
                    handlePropertyType={this.handlePropertyType} handleAddress={this.handleAddress}
                    handleName={this.handleName} submit={this.handleCreateProperty}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps, null)(AddPropertyPage);
