import React from 'react';
import { connect } from 'react-redux';
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
            step: 1,
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

    nextStep = () => {
        const { step } = this.state;

        if (step === 1) {
            if (this.validateGeneralInfo()) {
                this.setState({
                    step: step + 1
                });
            }
        }
    };

    prevStep = () => {
        const { step } = this.state;

        if (step === 2) {
            this.setState({
                step: step - 1
            });
        }
    };

    validatePostalCode = (postalCode, countryCode) => {
        if (!postalCode) {
            this.setState({
                validPostalCode: false
            });
            return false;
        } else {
            if (countryCode && !postcodeValidator(postalCode.trim(), countryCode)) {
                alert('Invalid postal code.');
                this.setState({
                    validPostalCode: false
                });
                return false;
            } else {
                this.setState({
                    validPostalCode: true
                });
                return true;
            }
        }
    };

    validateGeneralInfo = () => {
        const { name, propertyType  } = this.state;
        this.validateInput(name, 'validName');
        this.validateInput(propertyType.key, 'validPropertyType');
        return (name && propertyType);
    };

    validateAddressInfo = () => {
        const { address, city, province, postalCode, country } = this.state;
        this.validateInput(address, 'validAddress');
        this.validateInput(city, 'validCity');
        this.validateInput(province, 'validProvince');
        this.validateInput(country, 'validCountry');
        let validPostalCode = this.validatePostalCode(postalCode, country.key);
        return (address && city && validPostalCode && province && country);
    };

    validateInput(input, validField) {
        !input
            ? this.setState({[validField]: false})
            : this.setState({[validField]: true})
    }

    getFinalAddress = (address, addressInfo) => {
        let finalAddress;
        addressInfo
            ? finalAddress = `${address}, ${addressInfo}`.trim()
            : finalAddress = address.trim();
        return finalAddress;
    };

    handleCreateProperty = async() => {
        if (await this.validateAddressInfo()) {
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
                alert('Error creating property. Please try again later.');
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
            <AddPropertyComponent {...this.state} {...this.props}
                handlePropertyType={this.handlePropertyType} handleAddress={this.handleAddress}
                handleName={this.handleName} handleCity={this.handleCity}
                handlePostalCode={this.handlePostalCode} handleProvince={this.handleProvince}
                handleAddressInfo={this.handleAddressInfo} handleCountry={this.handleCountry}
                submit={this.handleCreateProperty} nextStep={this.nextStep}
                prevStep={this.prevStep}
            />
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
