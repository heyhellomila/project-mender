import React from 'react';
import { ActivityIndicator, FlatList, View, SafeAreaView, Text } from 'react-native';
import { jobListStyles, buttonStyles } from '../../stylesheets/JobListPageStyleSheet';
import { Button } from 'react-native-elements';
import CardComponent from './CardComponent'
import Header from './Header'

const JobListComponent = (props) => {
    return (
        <View>
            <SafeAreaView style={jobListStyles.jobListContainer}> 
                <FlatList
                    data={props.data}
                    renderItem={ ({item}) => (
                        <CardComponent {...item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={<Header {...props} />} 
                />
                {
                    props.isEmpty
                        ?   <View style={jobListStyles.emptyWorkOrders}>
                                <Text style={jobListStyles.emptyText}>No work orders found!</Text>
                                <Text style={jobListStyles.emptyText}>Create work orders or try adjusting your filters to display better results.</Text>
                            </View>
                        : null
                }
                <View style={jobListStyles.loadMoreContainer}>
                    {
                        props.loading === true && props.showSortIndicator === false
                            ?   <View>
                                    <ActivityIndicator animating size={'small'} style={{height: 30}} />
                                </View>
                            :   props.lastPage === false && props.showSortIndicator === false
                                    ?   <Button
                                            title='Load more'
                                            type='clear'
                                            buttonStyle={buttonStyles.loadMoreButton}
                                            titleStyle={buttonStyles.buttonTitle}
                                            onPress={props.handleLoadMore} />
                                    : null   
                    }
                </View>
            </SafeAreaView>
        </View>
    );
};

export default JobListComponent;