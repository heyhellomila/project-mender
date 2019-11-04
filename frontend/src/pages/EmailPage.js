import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions';
import { styles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import CommonFooter from '../components/CommonFooter';
import WorkOrderComponent from '../components/WorkOrderModal';

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

    navigateJobListPage = () => {
        this.props.navigation.navigate('JobListPage');
    }

    navigateHomePage = () => {
        this.props.navigation.navigate('HomePage');
    }

    navigateShoppingListPage = () => {
        this.props.navigation.navigate('ShoppingListPage');
    }

    navigateEmailPage = () => {
        this.props.navigation.navigate('EmailPage');
    }

    render() {
        return (
            <View style={styles.container}>
                <CommonHeader user={this.state.user} />
                <View style={styles.bodyContainer}>
                    <Text>Email</Text>
                    <WorkOrderComponent
                        data="Seb"
                        display={this.state.displayModal}
                        closeModal={() => this.setState({ displayModal: false })}
                    />
                </View>
                <CommonFooter
                    openWorkModal={this.openWorkModal}
                    navigateHomePage={this.navigateHomePage}
                    navigateJobListPage={this.navigateJobListPage}
                    navigateShoppingListPage={this.navigateShoppingListPage}
                    navigateEmailPage={this.navigateEmailPage} />
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