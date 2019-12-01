import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { postcodeValidator } from 'postcode-validator';
import { CountryCode } from '../constants/enums/CountryCode';
import { Province } from '../constants/enums/Province';
import { createProperty } from '../apis/properties/CreateProperty';
import AddPropertyComponent from '../components/addPropertyForm/AddPropertyComponent';
import { reloadProperties } from '../redux/actions';

class AddPropertyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitting: false,
            success: false,
            name: 'ya',
            address: 'yo',
            addressInfo: '',
            city: 'yup',
            postalCode: 'j4y 3c4',
            province: {'key': Province.QC, 'label': 'Quebec'},
            country: {'key': CountryCode.CA, 'label': 'Canada'},
            propertyType: {},
            validName: true,
            validAddress: true,
            validPropertyType: true,
            validProvince: true,
            validCity: true,
            validPostalCode: true,
            validCountry: true,
        };
    }

    validatePostalCode(postalCode, countryCode) {
        if (countryCode && !postcodeValidator(postalCode.trim(), countryCode)) {
            alert('Invalid postal code');
            this.setState({
                validPostalCode: false
            });
        } else {
            this.setState({
                validPostalCode: true
            });
        }
    }

    validateFields() {
        const { name, address, propertyType, city, province, postalCode, country } = this.state;
        if (!name) {
            this.setState({
                validName: false
            });
        } else {
            this.setState({
                validName: true
            });
        }
        if (!address) {
            this.setState({
                validAddress: false
            });
        } else {
            this.setState({
                validAddress: true
            });
        }
        if (!propertyType.key) {
            this.setState({
                validPropertyType: false
            });
        } else {
            this.setState({
                validPropertyType: true
            });
        }
        if (!city) {
            this.setState({
                validCity: false
            });
        } else {
            this.setState({
                validCity: true
            });
        }
        if (!postalCode) {
            this.setState({
                validPostalCode: false
            });
        } else {
            this.validatePostalCode(postalCode, country.key);
        }
        if (!province) {
            this.setState({
                validProvince: false
            });
        } else {
            this.setState({
                validProvince: true
            });
        }
        if (!country) {
            this.setState({
                validCountry: false
            });
        } else {
            this.setState({
                validCountry: true
            });
        }
        return (name && address && propertyType && city && postalCode && province && country);
    }

    handleCreateProperty = async() => {
        if (this.validateFields()) {
            try {
                this.setState({submitting: true});
                const { propertyType, address, addressInfo, city, province,
                    postalCode, country, name } = this.state;
                await createProperty(this.props.user.id, propertyType.key,
                    `${address}, ${addressInfo}`.trim(), city.trim(), province.key,
                    postalCode.trim(), country.key, name.trim()).then(() => {
                        this.setState({success: true});
                        this.props.reloadProperties();
                        setTimeout(() => {
                            this.props.navigation.navigate('HomePage');
                        }, 1500);
                });
            } catch (err) {
                alert(err.message);
            } finally {
                this.setState({submitting: false});
            }
        }
    };

    handleName = (value) => {
        this.setState({
            name: value
        });
    };

    handleAddress = (value) => {
        this.setState({
            address: value
        });
    };

    handleAddressInfo = (value) => {
        this.setState({
            addressInfo: value
        });
    };

    handleCity = (value) => {
        this.setState({
            city: value
        });
    };

    handlePostalCode = (value) => {
        this.setState({
            postalCode: value
        });
    };

    handleProvince = (value) => {
        this.setState({
            province: value
        });
    };

    handleCountry = (value) => {
        this.setState({
            country: value
        });
    };

    handlePropertyType = (value) => {
        this.setState({
            propertyType: value
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <AddPropertyComponent {...this.state} {...this.props}
                    handlePropertyType={this.handlePropertyType} handleAddress={this.handleAddress}
                    handleName={this.handleName} handleCity={this.handleCity}
                    handlePostalCode={this.handlePostalCode} handleProvince={this.handleProvince}
                    handleAddressInfo={this.handleAddressInfo} handleCountry={this.handleCountry}
                    submit={this.handleCreateProperty}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    property: state.property.property
});

const mapDispatchToProps = dispatch => ({
    reloadProperties: () => dispatch(reloadProperties(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPropertyPage);
