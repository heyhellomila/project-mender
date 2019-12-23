import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { Card, ListItem, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { userLogout, selectProperty } from '../redux/actions';
import { styles, jobList, headerStyles } from '../stylesheets/Stylesheet';
import CommonHeader from '../components/CommonHeader';
import { getWorkOrders } from '../apis/workOrders/GetWorkOrder';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

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
            pageSize: 10,
            pageNumber: 1,
            sortBy: 'id',
            ordering: 'ASC',
            sortIcon: 'sort-up',
            ascending: true,
            priority: ''
        };
        this.handleSort = this.handleSort.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleOrdering = this.handleOrdering.bind(this);
    }
  
    componentDidUpdate(prevProps, prevState) {
        if (this.props.property !== prevProps.property || this.props.navigation !== prevProps.navigation || this.state.sortBy !== prevState.sortBy || this.state.ordering !== prevState.ordering) {
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
        await getWorkOrders(this.props.property.id, this.state.pageSize, this.state.pageNumber, this.state.sortBy, this.state.ordering)
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

    handleSort = (index, value) => {
        switch(value) {
            case 'Sort by Work Order #':
                this.state.sortBy = 'id'
                break;
            case 'Sort by Due Date':
                this.state.sortBy = 'dueDate'
                break;
            case 'Sort by Priority':
                this.state.sortBy = 'priority'
                break;
            case 'Sort by Sector':
                this.state.sortBy = 'sector'
                break;
            case 'Sort by Type':
                this.state.sortBy = 'type'
                break;
            case 'Sort by Status':
                this.state.sortBy = 'status'
            default:
                this.state.sortBy = 'id'
        }
    }

    handleOrdering = () => {
        this.state.ascending === true
        ? this.setState({ordering: 'DESC', sortIcon: 'sort-down', ascending: false})
        : this.setState({ordering: 'ASC', sortIcon: 'sort-up', ascending: true})
    }
    
    renderCard = ({item}) => {
        return (   
            <View>
            <Card containerStyle={{backgroundColor: '#dfdfdf', borderRadius: 10, padding: 0, paddingBottom: 10}}>
                <Collapse>
                    <CollapseHeader> 
                        <Card containerStyle={jobList.jobListCard}>
                            <Text>{item.dueDate}</Text>
                            <Text>{item.title}</Text>
                            <Text>{item.priority}</Text>
                            <Text># {item.id}</Text>
                            <Text>{item.type}</Text>
                        </Card>
                    </CollapseHeader>
                    <CollapseBody style={{alignItems:'center', justifyContent:'center'}}>
                        <Card containerStyle={jobList.jobListCard}>
                            <Text>more info</Text>
                        </Card> 
                    </CollapseBody>
                </Collapse>
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
                <View style={jobList.jobListHeader}>
                    <ModalDropdown 
                        defaultValue='Sort by Work Order #'
                        options={[
                            'Sort by Work Order #', 
                            'Sort by Due Date', 
                            'Sort by Priority', 
                            'Sort by Sector', 
                            'Sort by Type', 
                            'Sort by Status'
                        ]}
                        style={jobList.jobListDropdown}
                        animated={true}
                        onSelect={this.handleSort}
                    />
                    <Button
                        icon={
                            <Icon
                                name={this.state.sortIcon}
                                size={20}
                                color='black'
                            />
                        }
                        type='clear'
                        onPress={this.handleOrdering}
                    />  
                </View>
                
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
