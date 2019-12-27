import React from 'react';
import { FlatList, View, SafeAreaView } from 'react-native';
import { jobListStyles, buttonStyles } from '../../stylesheets/JobListPageStyleSheet';
import { Button } from 'react-native-elements';
import CardComponent from './CardComponent'
import Header from './Header'

const JobListComponent = (props) => {
    return (
        <View>
            <SafeAreaView style={jobListStyles.jobListContainer}>
                <FlatList
                    data={props.workOrders}
                    renderItem={ ({item}) => (
                        <CardComponent {...item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={<Header {...props} />}
                />
                <Button
                    title='Load More'
                    type='clear'
                    titleStyle={buttonStyles.buttonTitle}
                    onPress={props.handleLoadMore}
                />
            </SafeAreaView>
        </View>
    );
};

export default JobListComponent;