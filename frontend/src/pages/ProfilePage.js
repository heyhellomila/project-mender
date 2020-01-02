import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {updateUser, updateUserPassword} from '../../src/apis/users/UpdateUser';
import {getUser} from '../../src/apis/users/GetUser';
import {reloadUserProfile} from '../redux/actions';
import validator from 'validator';
import passwordValidator from '../utils/PasswordUtils';
import validatePhoneNumber from '../utils/PhoneNumberUtils';
import ProfilePageForm from '../components/profileForms/ProfilePageForm';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "profilePage",
            user: props.user,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
            phoneNumber: props.user.phoneNumber,
            password: null,
            confirmPassword: null,
            errorMsg: null,
            validFirstName: true,
            validLastName: true,
            validEmail: true,
            validPhoneNumber: true,
            validPasswordMatch: true,
            validPassword: true,
            updated: false,
            loading: false,
            disableUpdateButton: true,
        }
    }

    async componentDidUpdate() {
        const {loading} = this.state;
        if (this.props.reloadingUserProfile && !loading) {
            this.setState({loading: true}, async () => {
                await this.getUpdatedProfile();
            });
        }
    }

    goToEditProfilePage = () => {
        this.setState({
            page: "editProfilePage",
            disableUpdateButton: true
        })
    };

    goToPasswordChange = () => {
        this.setState({
            page: "passwordChangePage"
        })
    };

    goToProfilePage = () => {
        const {user} = this.state;
        this.setState({
            page: "profilePage",
            validFirstName: true,
            validLastName: true,
            validEmail: true,
            validPhoneNumber: true,
            validPasswordMatch: true,
            validPassword: true,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber,
            password: null,
            confirmPassword: null
        })
    };

    validateFields = () => {
        const {firstName, lastName, email, phoneNumber, user, validFirstName, validLastName, validEmail, validPhoneNumber,inputsNotChanged, validInputs} = this.state;
        this.setState({disableUpdateButton: false})
        if (firstName === this.props.user.firstName && lastName === this.props.user.lastName && email === this.props.user.email && phoneNumber === this.props.user.phoneNumber) {
            this.setState({disableUpdateButton: true})
        }
        if (!validFirstName || !validLastName || !validEmail || !validPhoneNumber) {
            this.setState({disableUpdateButton: true})
        }
    }

    getUpdatedFields = () => {
        const {firstName, lastName, email, phoneNumber, user, validFirstName, validLastName, validEmail, validPhoneNumber} = this.state;
        let updatedUser = {};
        if (firstName !== this.props.user.firstName) {
            updatedUser.firstName = firstName
        }
        if (lastName !== this.props.user.lastName) {
            updatedUser.lastName = lastName
        }
        if (email !== this.props.user.email) {
            updatedUser.email = email
        }
        if (phoneNumber !== this.props.user.phoneNumber) {
            updatedUser.phoneNumber = phoneNumber
        }
        return updatedUser;
    }

    handleFirstNameChange = event => {
        this.setState({firstName: event}, async() => {
            await this.handleNameValidation(this.state.firstName, 'validFirstName').then(() =>{
                this.validateFields();
            });
        })
    };

    handleLastNameChange = event => {
        this.setState({lastName: event}, async () => {
            await this.handleNameValidation(this.state.lastName, 'validLastName').then(() => {
                this.validateFields();
            });
        })
    };

    handleNameValidation = async (input, validField) => {
        input.length > 0
            ? this.setState(
            {[validField]: true}
            )
            : this.setState({
                [validField]: false
            })

    }

    handleEmailChange = event => {
        this.setState({email: event}, async () => {
            await this.handleEmailValidation().then(() => {
                this.validateFields();
            });
        })
    };

    handleEmailValidation = async () => {
        const {email} = this.state;
        !validator.isEmail(email)
            ? this.setState(
            {validEmail: false}
            )
            : this.setState({
                validEmail: true
            })
    }

    handlePhoneNumberChange = event => {
        this.setState({phoneNumber: event}, async () => {
           await this.handlePhoneNumberValidation().then(() => {
               this.validateFields();
           });
        })
    };

    handlePhoneNumberValidation = async () => {
        const {phoneNumber} = this.state;
        !validatePhoneNumber(phoneNumber)
            ? this.setState(
            {validPhoneNumber: false}
            )
            : this.setState({
                validPhoneNumber: true
            })
    }

    handleNewPasswordChange = event => {
        this.setState({password: event})
    };

    handleConfirmPasswordChange = event => {
        this.setState({confirmPassword: event})
    };

    handlePasswordChange = async () => {
        const {password, confirmPassword} = this.state;
        this.setState({validPasswordMatch: true, validPassword: true})
        if (password !== confirmPassword) {
            this.setState({validPasswordMatch: false});
        }
        if (!passwordValidator.validate(password)) {
            this.setState({validPassword: false});
        }
        if (this.state.validPasswordMatch && this.state.validPassword) {
            this.handleUpdate();
        }
    };

    handleUpdate = async () => {
        const {firstName, lastName, email, phoneNumber, password, user} = this.state;
        this.setState({disableUpdateButton: true})
        try {
            await updateUser(user.id, this.getUpdatedFields())
                .then(() => {
                    this.props.reloadUserProfile(true, user);
                });
        } catch (err) {
            this.setState({errorMsg: err.message})
        }
    };

    async getUpdatedProfile() {
        await getUser(this.state.user.id).then((response) => {
            this.props.reloadUserProfile(false, response.data);
            alert("Profile Updated")
            this.setState({
                page: "profilePage",
                user: response.data,
                loading: false
            })
        })
    }

    render() {
        return (
            <ProfilePageForm
                {...this.state}
                handleUpdate={this.handleUpdate}
                handleFirstNameChange={this.handleFirstNameChange}
                handleLastNameChange={this.handleLastNameChange}
                handleEmailChange={this.handleEmailChange}
                handlePhoneNumberChange={this.handlePhoneNumberChange}
                handleNewPasswordChange={this.handleNewPasswordChange}
                handleConfirmPasswordChange={this.handleConfirmPasswordChange}
                handlePasswordChange={this.handlePasswordChange}
                goToEditProfilePage={this.goToEditProfilePage}
                goToPasswordChange={this.goToPasswordChange}
                goToProfilePage={this.goToProfilePage}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    reloadUserProfile: (bool, user) => dispatch(reloadUserProfile(bool, user)),
});

const mapStateToProps = (state) => ({
    user: state.user.user,
    reloadingUserProfile: state.user.reloadingUserProfile
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
