import React, { Component } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { getPropertiesByUser } from '../apis/properties/GetPropertiesByUser';
import { connect } from 'react-redux';
import { buttons, styles } from '../stylesheets/Stylesheet';
import { selectProperty } from '../redux/actions';


class PropertyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            onPress: false
        }
    }

    async componentDidMount() {
        await getPropertiesByUser('5db9ee23349a0b4244e7693a')
            .then(res => {
                this.setState({
                    properties: res.data.map(property => ({
                        id: property._id,
                        name: property.name,
                        address: property.address,
                    }))
                })
            }).catch(error => {
                alert(error.res)
            })
    }

    handleButtonOnPress = async () => {
        onPress = true,
        await this.props.selectProperty(propertySelected);
    }

    renderPropertyList() {
        return (
            <View>
                {this.state.properties.map(userProperty => (
                    <TouchableOpacity style={buttons.buttonProperty} underlayColor="#fff" onPress={this.hanleButtonOnPress}>
                        <Text key={userProperty.id} style={buttons.buttonTextProperty} suppressHighlighting={true}>{userProperty.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.renderPropertyList()}
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
