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
            propertyType: this.props.property.propertyType,
            name: this.props.property.name,
            submitting: false,
            success: false
        }
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
                        this.props.reloadProperties();
                        this.props.navigation.goBack();
                    });
            } catch (err) {
                alert('Error updating property, please try again later.');
            } finally {
                this.setState({submitting: false});
            }
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <EditPropertyComponent {...this.state} {...this.props}
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
    reloadProperties: () => dispatch(reloadProperties(true, {maintainSelection: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPropertyPage);
