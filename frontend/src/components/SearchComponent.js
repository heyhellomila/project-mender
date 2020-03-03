import React, { Component } from 'react';
import { View } from 'react-native';
import Search from 'react-native-search-box';
import { headerStyles} from '../stylesheets/Stylesheet';

class SearchComponent extends Component {
    render() {
        return (
            <View style={headerStyles.commonHeaderSearch}>
                <Search 
                    ref="search_box"
                    backgroundColor="white"
                    titleCancelColor="black"
                />
            </View>
        );
    }
}

export default SearchComponent;