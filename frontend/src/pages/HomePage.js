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
            completionRateWeekData: {
                labels: ['S', 'M', 'T', 'W', 'TH', 'F', 'S'],
                data: [[5, 3], [4, 3], [6], [2, 2], [7], [6, 2], [3]], // left is completed andn right is not completed
                barColors: ['#c2c1c9', '#e9e8ed']
            },
            completionRateMonthData: {
                labels: ['W1', 'W2', 'W3', 'W4'],
                data: [[1, 3], [1, 3], [5], [2, 2]],
                barColors: ['#c2c1c9', '#e9e8ed']
            },
            completionRateYearData: {
                labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], // show only last 6 months
                data: [[1, 3], [1], [5], [2, 2], [3], [1, 2]],
                barColors: ['#c2c1c9', '#e9e8ed']
            },
            completedData: {
                data: [0.65] // ratio of completed by homeowner/completed by contractor
            },
            chartConfig: {
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#060522',
                backgroundGradientToOpacity: 0,
                barPercentage: 1,
                color: (opacity = 1) => `rgba(6, 5, 34, ${opacity})`,
            },
        }
    }

    updateSelection = (selectedIndex) => {
        this.setState({
            selectedIndex: selectedIndex
        })
    }

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