import React, { Component } from 'react';
import { View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import Search from 'react-native-search-box';
import { headerStyles} from '../stylesheets/Stylesheet';
const searchImage = require('../../assets/search.jpg');

class SearchComponent extends Component {
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
            <View style={headerStyles.commonHeaderSearch}>
                <TextInput style={{
                    width: Dimensions.get('window').width*0.75,
                    height: Dimensions.get('window').height*0.05,
                    borderRadius: 25,
                    backgroundColor: '#EEF6F9',
                    paddingStart: '5%',
                    borderColor: '#EEF6F9',
                    borderWidth: 2,
                    textAlign: 'center',
                    alignSelf: 'center'}}
                           placeholder={'search'}
                           onChangeText={text => this.handleSearchText(text)}
                           value={this.state.searchText}/>
                <TouchableOpacity
                    onPress={() => this.handleSearchSubmit() }>
                    <Image source={searchImage} style={{width: 45, height: 45, borderRadius: 999}}></Image>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SearchComponent;