import React, { Component } from 'react'
import { View, Button } from 'react-native';
import { getPropertiesByUser } from '../apis/properties/GetPropertiesByUser';
import { connect } from 'react-redux';

class PropertyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: []
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

    RenderPropertyList() {
        return (
            <View>
                {this.state.properties.map(property => (
                    <Button key={property.id} title={property.name} onPress={() => {}}></Button>
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
    selectProperty: () => dispatch(selectProperty(property))
});

const mapStateToProps = state => ({
    property: state.property
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyComponent);
