import React from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { searchStyles } from '../stylesheets/SearchComponentStylesheet'

const searchImage = require('../../assets/search.jpg');

const SearchComponent = (props) => {
        return (
            <View style={searchStyles.searchBar}>
                <TextInput style={searchStyles.searchInput}
                           placeholder={'search'}
                           onChangeText={text => props.handleSearchText(text)}
                           value={props.searchText}/>
                <TouchableOpacity
                    onPress={() => props.handleSearchSubmit() }>
                    <Image source={searchImage} style={searchStyles.searchIcon}/>
                </TouchableOpacity>
            </View>
        );
}

export default SearchComponent;