import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../stylesheets/DataAnalyticsStyleSheet'
import SearchComponent from '../components/SearchComponent'
import Header from '../components/homePage/Header'
import DataAnalyticsComponent from '../components/homePage/DataAnalyticsComponent'

class HomePage extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {
        super(props);
        this.state = {
            user: props.user.user,
            selectedIndex: 0,
            buttons: ['Week', 'Month', 'Year'],
            data: {
                data: [0.65] // ratio of completed by homeowner/completed by contractor
            },
            chartConfig: {
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#08130D',
                backgroundGradientToOpacity: 0,
                color: (opacity = 1) => `rgba(6, 5, 34, ${opacity})`,
                barPercentage: 0.5,
            }
        }
    }

    updateSelection = (selectedIndex) => {
        this.setState({
            selectedIndex: selectedIndex
        })
    }

    // make functions to change all three data as a placeholder

    render() {
        return (
            <ScrollView style={styles.container}>
                <SearchComponent />
                <Header {...this.state} updateSelection={this.updateSelection} />
                <DataAnalyticsComponent {...this.state} />
            </ScrollView>
        ); 
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(HomePage);