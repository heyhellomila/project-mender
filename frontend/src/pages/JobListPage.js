import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
import { styles, jobList, headerStyles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrder';
import { WorkOrderPage } from '../pages/WorkOrderPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';

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
            loading: false}, // ! set to false for testing
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
                break;
            case "Title":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.title < y.title)
                : sortedOrders = sortedOrders.sort((x, y) => x.title > y.title)
                break; 
            case "Type":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.type < y.type)
                : sortedOrders = sortedOrders.sort((x, y) => x.type > y.type)
                break; 
            case "Sector":
                ascending ? sortedOrders = sortedOrders.sort((x, y) => x.sector < y.sector)
                : sortedOrders = sortedOrders.sort((x, y) => x.sector > y.sector)
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                        <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: 50, padding: 0}}>
                            <Icon name='calendar'
                                    size={25}
                                    color='black'>
                            </Icon>   
                            <Text style={{fontSize: 15}}>{moment(item.dueDate).format("MMM D")}</Text>
                        </View>
                        <View style={{flexDirection: 'column', width: 290}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                <Text style={{fontWeight: 'bold', width: 100}}>{item.title}</Text>
                                <Text>{item.priority}</Text>
                                <Text># {item.id}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                 <Text style={{fontSize: 11}}>Utilities -> Plumbing</Text>
                                 <Text style={{fontSize: 11}}>{item.type === 'CM' ? 'Corrective' : 'Preventive'}</Text>
                                 <Text style={{fontSize: 11}}>Status: Quote accepted</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        )
    }

    renderHeader = () => {
        return (
            <View>
                <ScrollView style={jobList.jobListHeader} horizontal={true}>
                    <Button
                        icon={
                            <Icon
                                name='bookmark'
                                size={15}
                                color='black'
                            />
                        }
                        title='Bookmarked'
                        type='outline'
                        containerStyle={jobList.jobListFilterButtonContainer}
                        buttonStyle={jobList.jobListFilterButton}
                        titleStyle={jobList.jobListFilterButtonTitle}
                    />
                    <Button
                        icon={
                            <Icon
                                name='calendar'
                                size={15}
                                color='black'
                            />
                        }
                        title='Due Date'
                        type='outline'
                        containerStyle={jobList.jobListFilterButtonContainer}
                        buttonStyle={jobList.jobListFilterButton}
                        titleStyle={jobList.jobListFilterButtonTitle}
                    /> 
                    <Button
                        icon={
                            <Icon
                                name='list'
                                size={15}
                                color='black'
                            />
                        }
                        title='Priority'
                        type='outline'
                        containerStyle={jobList.jobListFilterButtonContainer}
                        buttonStyle={jobList.jobListFilterButton}
                        titleStyle={jobList.jobListFilterButtonTitle}
                    />
                    <Button
                        icon={
                            <Icon
                                name='plug'
                                size={15}
                                color='black'
                            />
                        }
                        title='Sector'
                        type='outline'
                        containerStyle={jobList.jobListFilterButtonContainer}
                        buttonStyle={jobList.jobListFilterButton}
                        titleStyle={jobList.jobListFilterButtonTitle}
                    />
                    <Button
                        icon={
                            <Icon
                                name='wrench'
                                size={15}
                                color='black'
                            />
                        }
                        title='Type'
                        type='outline'
                        containerStyle={jobList.jobListFilterButtonContainer}
                        buttonStyle={jobList.jobListFilterButton}
                        titleStyle={jobList.jobListFilterButtonTitle}
                    />  
                    <Button
                        icon={
                            <Icon
                                name='check-circle'
                                size={15}
                                color='black' 
                            />
                        }
                        title='Status'
                        type='outline'
                        containerStyle={jobList.jobListFilterButtonContainer}
                        buttonStyle={jobList.jobListFilterButton}
                        titleStyle={jobList.jobListFilterButtonTitle}
                    />  
                </ScrollView>
                <ModalDropdown 
                    defaultValue='Sort by Work Order #'
                    options={['Sort by Work Order #', 'Sort by Due Date', 'Sort by Priority', 'Sort by Sector', 'Sort by Type', 'Sort by Status']}
                    style={jobList.jobListDropdown}
                    animated={true}
                />
            </View>
        );
    }

    renderFooter = () => {
        return (
            this.state.loading ?
                <View>
                    <ActivityIndicator color='black' style={{margin: 5}} />
                </View>
            : null
          );
    }

    renderJobList() {
        const { workOrders } = this.state;
        return (
            <View>
                <SafeAreaView style={jobList.jobListContainer}>
                    {
                        <FlatList
                            data={workOrders}
                            renderItem={this.renderCard}
                            keyExtractor={(item, index) => index.toString()}
                            //onEndReached={this.handleLoadMore} // ! uncomment once cards complete
                            onEndReachedThreshold={1}
                            ListHeaderComponent={this.renderHeader}
                            ListFooterComponent={this.renderFooter}
                        />
                    }
                </SafeAreaView>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <CommonHeader user={this.state.user} />
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
