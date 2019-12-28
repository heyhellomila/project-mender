import React from 'react';
import { ActivityIndicator, FlatList, View, SafeAreaView } from 'react-native';
import { jobListStyles, buttonStyles, headerStyles } from '../../stylesheets/JobListPageStyleSheet';
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
                <View style={jobListStyles.loadMoreContainer}>
                    {
                        props.loading === true
                            ?   <View style={jobListStyles.loadMoreIcon}>
                                    <ActivityIndicator animating size={'small'} style={{height: 30}} />
                                </View>
                            :   props.lastPage === false
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