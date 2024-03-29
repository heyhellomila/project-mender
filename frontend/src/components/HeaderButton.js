import { View } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

class HeaderButton extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.user != null;
    }

    render() {
        return (
            <View>
                <Button title={this.props.user.firstName[0]} 
                    onPress={() => this.props.navigation.openDrawer()}>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps, null)(HeaderButton);
