import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../stylesheets/Stylesheet';
import SearchComponent from '../components/SearchComponent'

class HomePage extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
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
                {/*<SearchComponent/>*/}
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
