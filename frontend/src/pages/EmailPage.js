import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions';
import { styles } from '../stylesheets/Stylesheet';
import SearchComponent from '../components/SearchComponent'
import Search from 'react-native-search-box';

class JobListPage extends React.Component {
    static navigationOptions = {
        title: 'Email Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            loggingOut: false,
            user: props.user.user,
            displayModal: false,
        }
    }

    openModal() {
        this.setState(prevState => {
            return {
                displayModal: true
            }
        });
    }

    closeModal = () => {
        this.setState(prevState => {
            return {
                displayModal: false
            }
        })
    }

    openWorkModal = () => {
        this.openModal();
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchComponent/>
                <View style={styles.bodyContainer}>
                    <Text>Email</Text>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
});

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(JobListPage);