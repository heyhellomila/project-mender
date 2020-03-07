import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { headerStyles } from '../stylesheets/Stylesheet';

class HeaderAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: props.property
        };
    }

    render() {
        return (
            <View>
                {this.props.property
                    ? <Text style={headerStyles.propertyHeaderText}>Property - {this.props.property.name}</Text>
                    : null
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    property: state.property.property,
    user: state.user.user
});

export default connect(mapStateToProps, null)(HeaderAddress);
