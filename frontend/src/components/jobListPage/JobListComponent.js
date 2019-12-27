import React from 'react';
import { FlatList, View, SafeAreaView } from 'react-native';
import { jobListStyles } from '../../stylesheets/JobListPageStyleSheet';
import CardComponent from './CardComponent'
import Header from './Header'

const JobListComponent = (props) => {
    return (
        <View>
            <SafeAreaView style={jobListStyles.jobListContainer}>
                {
                    <FlatList
                        data={props.workOrders}
                        renderItem={ ({item}) => (
                            <CardComponent {...item} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        //onEndReached={this.handleLoadMore} // ! uncomment once cards complete
                        onEndReachedThreshold={1}
                        ListHeaderComponent={<Header {...props} />}
                    />
                }
            </SafeAreaView>
        </View>
    );
};

export default JobListComponent;