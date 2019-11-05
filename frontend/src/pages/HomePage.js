import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions';
import { styles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import WorkOrderComponent from '../components/WorkOrderModal';

class HomePage extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home'
    }
    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            displayModal: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CommonHeader user={this.state.user} />
                <View style={styles.bodyContainer}>
                    <Text>Home page</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(HomePage);
