import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropertySectorComponent from "../../components/propertyForms/propertySectors/PropertySectorComponent";

class PropertySectorsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sectorType: ''
        }
    };

    handleSectorType = (value) => {
        this.setState({
            sectorType: value
        })
    };

    canSubmit = () => {
        return true;
    };

    submit = () => {
        console.log('ok');
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <PropertySectorComponent {...this.state} {...this.props}
                    handleSectorType={this.handleSectorType} canSubmit={this.canSubmit}
                    submit={this.submit}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertySectorsPage);
