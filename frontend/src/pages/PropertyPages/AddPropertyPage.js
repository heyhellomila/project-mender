import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { postcodeValidator } from 'postcode-validator';
import { CountryCode } from '../../constants/enums/CountryCode';
import { Province } from '../../constants/enums/Province';
import { createProperty } from '../../apis/properties/CreateProperty';
import AddPropertyComponent from '../../components/propertyForms/addPropertyForm/AddPropertyComponent';
import { reloadProperties } from '../../redux/actions';

class AddPropertyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitting: false,
            success: false,
            name: '',
            address: '',
            addressInfo: '',
            city: '',
            postalCode: '',
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
        if (!postalCode) {
            this.setState({
                validPostalCode: false
            });
        } else {
            if (countryCode && !postcodeValidator(postalCode.trim(), countryCode)) {
                alert('Invalid postal code.');
                this.setState({
                    validPostalCode: false
                });
            } else {
                this.setState({
                    validPostalCode: true
                });
            }
        }

    }

    validateFields() {
        const { name, address, propertyType, city, province, postalCode, validPostalCode, country } = this.state;
        this.validateInput(name, 'validName');
        this.validateInput(address, 'validAddress');
        this.validateInput(propertyType.key, 'validPropertyType');
        this.validateInput(city, 'validCity');
        this.validateInput(province, 'validProvince');
        this.validateInput(country, 'validCountry');
        this.validatePostalCode(postalCode, country.key);
        return (name && address && propertyType && city && postalCode && validPostalCode && province && country);
    }

    validateInput(input, validField) {
        if (!input) {
            this.setState({
                [validField]: false
            })
        } else {
            this.setState({
                [validField]: true
            })
        }
    }

    getFinalAddress = (address, addressInfo) => {
        let finalAddress = '';
        addressInfo
            ? finalAddress = `${address}, ${addressInfo}`.trim()
            : finalAddress = address.trim();
        return finalAddress;
    };

    handleCreateProperty = async() => {
        if (this.validateFields()) {
            try {
                this.setState({submitting: true});
                const { propertyType, address, addressInfo, city, province,
                    postalCode, country, name } = this.state;
                await createProperty(this.props.user.id, propertyType.key,
                    this.getFinalAddress(address, addressInfo), city.trim(), province.key,
                    postalCode.trim(), country.key, name.trim()).then(() => {
                        this.setState({success: true});
                        this.props.reloadProperties();
                        setTimeout(() => {
                            this.props.navigation.navigate('PropertySectors');
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
    reloadProperties: () => dispatch(reloadProperties(true, {selectLast: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPropertyPage);
