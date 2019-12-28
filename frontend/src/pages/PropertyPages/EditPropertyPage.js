import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { reloadProperties } from '../../redux/actions';
import { updatePropertyById } from '../../apis/properties/UpdatePropertyById';
import EditPropertyComponent from '../../components/propertyForms/editPropertyForm/EditPropertyComponent';

class EditPropertyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validName: true,
            validPropertyType: true,
            propertyType: this.props.property.propertyType,
            name: this.props.property.name,
            submitting: false,
            success: false
        }
    };

    handlePropertyType = (value) => {
        this.setState({
            propertyType: value
        });
    };

    handleName = (value) => {
        this.setState({
            name: value
        });
    };

    getChangedFields = () => {
        const { name, propertyType } = this.state;
        let property = {};

        if (name !== this.props.property.name) {
            property.name = name;
        }
        if (propertyType.key !== this.props.property.propertyType) {
            property.propertyType = propertyType.key;
        }
        return property;
    };

    updateProperty = async() => {
        this.setState({
            submitting: true
        });
        await updatePropertyById(this.props.property.id,
            this.getChangedFields()).then(
            () => {
                this.setState({
                    success: true,
                    loading: false
                });
                this.props.reloadProperties();
                this.props.navigation.goBack();
            });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <EditPropertyComponent {...this.state} {...this.props}
                    handleName={this.handleName} handlePropertyType={this.handlePropertyType}
                    submit={this.updateProperty}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    property: state.property.property
});

const mapDispatchToProps = dispatch => ({
    reloadProperties: () => dispatch(reloadProperties(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPropertyPage);
