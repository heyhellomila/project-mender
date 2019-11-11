import React from 'react';
import { Text, View, } from 'react-native';
import { connect } from 'react-redux';
import { userLogout } from '../redux/actions';
import { styles, jobListTable } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { Table, Row, Rows } from 'react-native-table-component';

class JobListPage extends React.Component {
    static navigationOptions = {
        draweLabel: 'Job List Page',
    };
    constructor(props) {
        super(props);
        this.state = {
            loggingOut: false,
            user: props.user.user,
            displayModal: false,
            tableHead: ['W.O #', 'Name', 'Type', 'Sector'],
            tableData: [
                ['1000', 'Broken Floor Tile', 'CM', 'Bathroom'],
                ['1001', 'Plumbing Pipe Leak', 'CM', 'Kitchen'],
                ['1002', 'Gutter Cleaning', 'PM', 'Roof'],
                ['1003', 'Inspect Furnace', 'PM', 'Living Room']
            ]
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
        const state = this.state;
        return (
            <View style={styles.container}>
                <CommonHeader user={this.state.user} />
                <View style={jobListTable.jobListTableContainer}>
                    <Text>JOB LIST</Text>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={jobListTable.jobListTablehead} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={jobListTable.jobListTabletext} />
                    </Table>
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
