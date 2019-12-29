import React, { Component } from 'react';
import {ScrollView, Text, View} from 'react-native';
import { getPropertiesByUser } from '../../../apis/properties/GetPropertiesByUser';
import { connect } from 'react-redux';
import {reloadProperties, selectProperty, loadProperties} from '../../../redux/actions';
import PropertyListComponent from './PropertyListComponent';
import {drawerComponent} from '../../../stylesheets/DrawerStyleSheet';
import {Button} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {PropertyType} from '../../../constants/enums/PropertyType';
import {Province} from '../../../constants/enums/Province';
import {CountryCode} from '../../../constants/enums/CountryCode';

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

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.reloadProperties && !this.state.loading && !prevState.loading) {
            this.setState({
                loading: true
            });
            await this.getPropertiesAndSelectProperty(this.props.selectLast).then(() => {
                this.props.finishReloadingProperties();
            });
        }
    }

    async componentDidMount() {
        await this.getPropertiesAndSelectProperty().then(
            () => this.props.loadProperties()
        );
    }

    async getPropertiesAndSelectProperty(selectLast = false) {
        await getPropertiesByUser(this.props.user.user.id)
            .then((res) => {
                this.setState({
                    properties: res.data.map((property) => ({
                        id: property.id,
                        name: property.name,
                        address: property.address,
                        propertyType: PropertyType[property.propertyType.type],
                        city: property.city,
                        province: Province[property.province],
                        postalCode: property.postalCode,
                        country: CountryCode[property.countryCode]
                    }))
                }, () => {
                    if (this.state.properties.length > 0 && !this.props.maintainSelection) {
                        selectLast
                            ? this.props.selectProperty(this.state.properties[this.state.properties.length-1])
                            : this.props.selectProperty(this.state.properties[0]);
                    } else {
                        this.state.properties.forEach((property) => {
                            if (this.props.property.id === property.id) {
                                this.props.selectProperty(property);
                            }
                        })
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
                <Spinner
                    visible={this.props.loadingProperties || this.props.reloadProperties || this.state.loading}
                />
                <Text style={drawerComponent.propertyHeader}>My Properties</Text>
                    {this.state.loading
                            ?   <View><Text>Loading...</Text></View>
                            :   <View style={{flex: 2}}>
                                    <ScrollView>
                                        <PropertyListComponent {...this.state} {...this.props}/>
                                    </ScrollView>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={drawerComponent.editPropertyContainer}>
                                            <Button
                                                title='Details'
                                                type='outline'
                                                raised={true}
                                                onPress={() => this.props.navigation.navigate('PropertyDetails')}/>
                                        </View>
                                        <View style={drawerComponent.addPropertyContainer}>
                                            <Button
                                                title='Add Property'
                                                type='outline'
                                                raised={true}
                                                onPress={() => this.props.navigation.navigate('AddProperty')}/>
                                        </View>
                                    </View>
                                </View>
                    }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    property: state.property.property,
    reloadProperties: state.property.reloadProperties,
    loadingProperties: state.property.loadingProperties,
    selectLast: state.property.selectLast,
    maintainSelection: state.property.maintainSelection
});

const mapDispatchToProps = (dispatch) => ({
    loadProperties: (bool) => dispatch(loadProperties(bool)),
    selectProperty: (property) => dispatch(selectProperty(property)),
    finishReloadingProperties: () => dispatch(reloadProperties(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyComponent);
