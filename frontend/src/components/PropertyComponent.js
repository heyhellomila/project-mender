import React, { Component } from 'react'
import { FlatList, Text, Modal, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { styles, buttons } from '../stylesheets/Stylesheet';
import axios from 'axios';
import { LOCAL_API_KEY } from 'react-native-dotenv'	
import { AsyncStorage } from 'react-native';

var api = axios.create({	
    baseURL: `http://${LOCAL_API_KEY}/api`,
    timeout: 5000
});

class PropertyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: []
        }
    }

    async componentDidMount() {
        await api.get('/users/${id}/properties', {	
            headers: {	
                'Authorization': await AsyncStorage.getItem('Authorization')	
            }	
            })
            .then(res => {
                this.setState({ properties: res.data })
            .catch(error => {
                console.log(error.res)
            })
        });
    }

    render() {
        return (
            <View>
                <Button title="Property 1 - " />
                <Button title="Property 2 - " />
                <Button title="Property 3 - " />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    selectProperty: () => dispatch(selectProperty(property))
});

const mapStateToProps = state => ({
    property: state.property
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyComponent);