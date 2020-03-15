import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../stylesheets/DataAnalyticsStyleSheet'
import SearchComponent from '../components/SearchComponent'
import Header from '../components/homePage/Header'

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
                <Header {...this.state}
                    updateSelection={this.updateSelection}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(HomePage);
