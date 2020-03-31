import React, { Component } from 'react';
import SearchComponent from '../components/SearchComponent'
const searchImage = require('../../assets/search.jpg');

class CommonSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            searchText: ''
        }
        this.handleSearchText = this.handleSearchText.bind(this);
    }

    handleSearchText = event => {
        this.setState({searchText: event})
    };

    handleSearchSubmit = () => {
        const {searchText} = this.state;
        if (searchText === '') {
            this.setState({searchText: null}, () => this.sendData())
        } else {
            this.sendData()
        }
    }

    sendData = () => {
        this.props.getSearchTerm(this.state.searchText);
    }

    render() {
        return (
            <SearchComponent {...this.state}
                             {...this.props}
                             handleSearchText={this.handleSearchText}
                             handleSearchSubmit={this.handleSearchSubmit}/>
        );
    }
}

export default CommonSearch;