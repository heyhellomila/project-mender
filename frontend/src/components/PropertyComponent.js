import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { getPropertiesByUser } from '../apis/properties/GetPropertiesByUser';
import { connect } from 'react-redux';
import { selectProperty } from '../redux/actions'
import { propertyList } from '../stylesheets/Stylesheet';

class PropertyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            property: this.props.property
        }
    }

    async componentDidMount() {
        await getPropertiesByUser(this.props.user.user._id)
            .then(res => {
                this.setState({
                    properties: res.data.map(property => ({
                        id: property._id,
                        name: property.name,
                        address: property.address,
                    }))
                }, () => {
                    if (this.state.properties.length > 0) {
                        this.props.selectProperty(this.state.properties[0])
                    }
                })
            }).catch(error => {
                alert(error)
        })
    }

    RenderPropertyList() {
        return (
            <View>
                {this.state.properties.map(property => (
                    <TouchableOpacity style={(this.props.property.property && this.props.property.property.id == property.id) 
                        ? propertyList.selectedPropertyButton
                        : propertyList.propertyButton} 
                        key={property.id}
                        onPress={() => {this.props.selectProperty(property)}}>
                            <Text style={(this.props.property.property && this.props.property.property.id == property.id) 
                                ? propertyList.selectedPropertyText
                                : propertyList.propertyText}>
                                    {property.name}
                                </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.RenderPropertyList()}
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    selectProperty: (property) => dispatch(selectProperty(property))
});


export default connect(null, mapDispatchToProps)(PropertyComponent);
