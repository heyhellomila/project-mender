import React from 'react';
import { connect } from 'react-redux';
import {Alert, View} from 'react-native';
import { reloadProperties } from '../../redux/actions';
import { updatePropertyById } from '../../apis/properties/UpdatePropertyById';
import {ActivityStatus} from '../../constants/enums/ActivityStatus';
import PropertyDetailsComponent from '../../components/propertyForms/propertyDetails/PropertyDetailsComponent';

class PropertyDetailsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            editing: false,
            validName: true,
            propertyType: this.props.property.propertyType,
            name: this.props.property.name,
            submitting: false,
            success: false
        }
    };

    deleteProperty = async() => {
        Alert.alert('Delete Property',
            `Are you sure you want to delete ${this.props.property.name}?`,
            [
                {text: 'Cancel', onPress: () => {}},
                {text: 'Delete', onPress: () => this.confirmDeleteProperty()}
            ]);
    };

    confirmDeleteProperty = async() => {
        this.setState({loading: true});
        await updatePropertyById(this.props.property.id,
            { activityStatus: ActivityStatus.INACTIVE }).then(
                () => {
                    this.props.reloadProperties();
                    this.props.navigation.goBack();
                });
    };

    toggleEdit = () => {
        const { editing } = this.state;
        this.setState({
            editing: !editing
        });
    };

    handlePropertyType = (value) => {
        this.setState({
            propertyType: value.key
        });
    };

    handleName = (value) => {
        this.setState({
            name: value
        });
    };

    canSubmit = () => {
        const { name, propertyType, success, submitted } = this.state;
        const { property } = this.props;
        return ((propertyType !== property.propertyType) || (name !== property.name))
            && !success && !submitted;
    };

    getChangedFields = () => {
        const { name, propertyType } = this.state;
        let property = {};

        if (name !== this.props.property.name) {
            property.name = name;
        }
        if (propertyType !== this.props.property.propertyType) {
            property.propertyType = propertyType;
        }
        return property;
    };

    validateFields() {
        const { name } = this.state;
        this.validateInput(name, 'validName');
        return (name);
    }

    validateInput(input, validField) {
        if (!input) {
            this.setState({
                [validField]: false
            })
        } else {
            this.setState({
                [validField]: true
            })
        }
    }

    updateProperty = async() => {
        if (this.validateFields()) {
            this.setState({
                submitting: true
            });
            try {
                await updatePropertyById(this.props.property.id,
                    this.getChangedFields()).then(
                    () => {
                        this.setState({
                            success: true,
                            loading: false
                        });
                        this.props.reloadPropertiesAfterEdit();
                    });
            } catch (err) {
                alert('Error updating property, please try again later.');
            } finally {
                this.setState({submitting: false, editing: false, success: false});
            }
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <PropertyDetailsComponent {...this.state} {...this.props}
                  deleteProperty={this.deleteProperty} toggleEdit={this.toggleEdit}
                  handleName={this.handleName} handlePropertyType={this.handlePropertyType}
                  submit={this.updateProperty} canSubmit={this.canSubmit}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    property: state.property.property
});

const mapDispatchToProps = dispatch => ({
    reloadProperties: () => dispatch(reloadProperties(true)),
    reloadPropertiesAfterEdit: () => dispatch(reloadProperties(true, {maintainSelection: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailsPage);
