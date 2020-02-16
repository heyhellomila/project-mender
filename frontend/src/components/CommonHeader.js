import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Search from 'react-native-search-box';
import { connect } from 'react-redux';
import { headerStyles} from '../stylesheets/Stylesheet';

class CommonHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        };
    }

    render() {
        return (
            <View>
                <View style={headerStyles.commonHeaderTextComponent}>
                    { this.props.user
                        ? <Text style={headerStyles.commonHeaderText}>Hi {this.props.user.firstName}!</Text>
                        : null
                    }
                </View>
                <View style={ headerStyles.commonHeaderSearch }>
                    <Search 
                        ref="search_box"
                        backgroundColor="white"
                        titleCancelColor="black"
                        
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps, null)(CommonHeader);
