import React from 'react';
import { connect } from 'react-redux';
import {Alert, View} from 'react-native';
import { reloadProperties } from '../../redux/actions';
import { updatePropertyById } from '../../apis/properties/UpdatePropertyById';
import {ActivityStatus} from "../../constants/enums/ActivityStatus";
import PropertyDetailsComponent from "../../components/propertyForms/propertyDetails/PropertyDetailsComponent";

class PropertyDetailsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
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

    render() {
        return (
            <View style={{flex: 1}}>
                <PropertyDetailsComponent {...this.state} {...this.props}
                   deleteProperty={this.deleteProperty}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailsPage);
