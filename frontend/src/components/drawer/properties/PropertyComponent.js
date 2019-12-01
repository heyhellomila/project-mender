import React, { Component } from 'react';
import {ScrollView, Text, View} from 'react-native';
import { getPropertiesByUser } from '../../../apis/properties/GetPropertiesByUser';
import { connect } from 'react-redux';
import {reloadProperties, selectProperty} from '../../../redux/actions';
import PropertyListComponent from "./PropertyListComponent";
import {drawerComponent} from "../../../stylesheets/DrawerStyleSheet";
import {Button} from "react-native-elements";

class PropertyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            properties: [],
            property: this.props.property,
            navigation: props.navigation,
        };
    }

    async componentDidUpdate() {
        if (this.props.reloadProperties && !this.state.loading) {
            this.setState({
                loading: true
            });
            await this.getPropertiesAndSelectProperty(true).then(() => {
                this.props.finishReloadingProperties();
            });
        }
    }

    async componentDidMount() {
        await this.getPropertiesAndSelectProperty();
    }

    async getPropertiesAndSelectProperty(selectLast = false) {
        await getPropertiesByUser(this.props.user.user.id)
            .then((res) => {
                this.setState({
                    properties: res.data.map((property) => ({
                        id: property.id,
                        name: property.name,
                        address: property.address
                    }))
                }, () => {
                    if (this.state.properties.length > 0) {
                        selectLast
                            ? this.props.selectProperty(this.state.properties[this.state.properties.length-1])
                            : this.props.selectProperty(this.state.properties[0]);
                    }
                    this.setState({
                        loading: false
                    });
                });
            }).catch((error) => {
                alert(error);
            });
    }

    render() {
        return (
            <View style={drawerComponent.properties}>
                <Text style={drawerComponent.propertyHeader}>My Properties</Text>
                    {this.state.loading
                            ?   <View><Text>Loading...</Text></View>
                            :   <ScrollView>
                                    <PropertyListComponent {...this.state} {...this.props}/>
                                    <View style={{alignContent:'flex-end', alignSelf:'flex-end', width:'50%'}}>
                                        <Button
                                            title='Add Property'
                                            type="outline"
                                            raised={true}
                                            onPress={() => this.props.navigation.navigate('AddProperty')}
                                        />
                                    </View>
                                </ScrollView>
                    }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    reloadProperties: state.property.reloadProperties
});

const mapDispatchToProps = (dispatch) => ({
    selectProperty: (property) => dispatch(selectProperty(property)),
    finishReloadingProperties: () => dispatch(reloadProperties(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyComponent);
