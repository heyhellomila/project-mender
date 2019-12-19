import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
import { styles, jobListTable, headerStyles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrder';
import { WorkOrderPage } from '../pages/WorkOrderPage';
import Icon from 'react-native-vector-icons/FontAwesome';

class JobListPage extends React.Component {

    static navigationOptions = {
        draweLabel: 'Job List Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            property: this.props.property,
            workOrders: [],
            data: [],
            loading: false,
            error: false,
            attributeOrder: 'W.O #',
            ascending: true,
            pageSize: 10,
            pageNumber: 1
        };
        this.sortWorkOrders = this.sortWorkOrders.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }
  
    componentDidUpdate(prevProps) {
        if (this.props.property !== prevProps.property || this.props.navigation !== prevProps.navigation) {
            this.getListOfWorkOrders();
        }
    }

    componentDidMount() {
        this.setState({
            loading: false},
            () => this.getListOfWorkOrders()
        );
    }

    async getListOfWorkOrders() {
        await getWorkOrders(this.props.property.id, this.state.pageSize, this.state.pageNumber)
        .then((response) => {
            this.setState({
                workOrders: response.data.map((workOrder) => ({
                    id: workOrder.id,
                    title: workOrder.title,
                    type: workOrder.workOrderType.type,
                    priority: workOrder.priorityType.type,
                    dueDate: workOrder.dueDate
                    }))
            });
        })
        .then((response) => response.json())
        .then((response) => {
            alert (this.state.pageNumber)
            this.setState({
                workOrders: [...this.state.workOrders, ...response.results],
                error: response.error || null,
                loading: false
            });
        })
        .catch((err) => {
           this.setState({error: true, loading: false, errorMsg: err.message})
        });
    }

    handleLoadMore = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 1,
            loading: true},
            () => this.getListOfWorkOrders()
        )
    }

    sortWorkOrders = (attribute) => {
        ascending = false;
        (attribute === this.state.attributeOrder) ? ascending = !this.state.ascending : ascending = true;
        sortedOrders = this.state.workOrders;
        switch (attribute) {
            case "W.O #":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x._id < y._id)
                : sortedOrders = sortedOrders.sort((x, y) => x._id > y._id)
                console.log("sorting W.O #");
                break;
            case "Title":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.title < y.title)
                : sortedOrders = sortedOrders.sort((x, y) => x.title > y.title)
                console.log("sorting title");
                break; 
            case "Type":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.type < y.type)
                : sortedOrders = sortedOrders.sort((x, y) => x.type > y.type)
                console.log("sorting type");
                break; 
            case "Sector":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.sector < y.sector)
                : sortedOrders = sortedOrders.sort((x, y) => x.sector > y.sector)
                console.log("sorting sector");
                break; 
            default:
                sortedOrders = this.state.workOrders;
        }
        this.setState({attributeOrder: attribute, ascending: ascending, workOrders: sortedOrders});
    }

    renderCard = ({item}) => {
        return (   
            <View>
                <Card>
                    <Text>{item.dueDate}</Text>
                    <Text>{item.title}</Text>
                    <Text>{item.priority}</Text>
                    <Text># {item.id}</Text>
                    <Text>{item.type}</Text>
                </Card>
            </View>
        )
    }

    renderHeader = () => {
    }

    renderFooter = () => {
        return (
                this.state.loading ?
                    <View>
                        <ActivityIndicator color="black" style={{margin: 5}} />
                    </View>
                : null
          );
    }

    renderJobList() {
        const { workOrders } = this.state;
        return (
            <View>
                <CommonHeader user={this.state.user} />
                <SafeAreaView style={jobListTable.jobListTableContainer}>
                    {
                        <FlatList
                            data={workOrders}
                            renderItem={this.renderCard}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={1}
                            ListFooterComponent={this.renderFooter}
                        />
                    }
                </SafeAreaView>
            </View>
        );
    }

    render() {
        return (
            <ScrollView styles={styles.container}>
                {this.renderJobList()}
            </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout()),
    selectProperty: (property) => dispatch(selectProperty(property))
});

const mapStateToProps = state => ({
    user: state.user,
    property: state.property.property
});

export default connect(mapStateToProps, mapDispatchToProps)(JobListPage);
