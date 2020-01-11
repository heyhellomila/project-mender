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
            newEmail: null,
            confirmEmail: null,
            phoneNumber: props.user.phoneNumber,
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
            errorMsg: null,
            validFirstName: true,
            validLastName: true,
            emailNotAlreadyUsed: true,
            validEmail: true,
            validEmailMatch: true,
            validAuth: true,
            validPhoneNumber: true,
            validPasswordMatch: true,
            validPassword: true,
            passwordNotAlreadyUsed: true,
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

    goToChangeNamePage = () => {
        this.setState({
            page: "changeNamePage",
            disableUpdateButton: true
        })
    };

    goToUpdateEmailPage = () => {
        this.setState({
            page: "updateEmailPage",
            disableUpdateButton: false
        })
    };

    goToUpdatePhoneNumberPage = () => {
        this.setState({
            page: "updatePhoneNumberPage",
            disableUpdateButton: true
        })
    };

    goToChangePasswordPage = () => {
        this.setState({
            page: "passwordChangePage",
            disableUpdateButton: false
        })
    };

    goToProfilePage = () => {
        const {user} = this.state;
        this.setState({
            page: "profilePage",
            validFirstName: true,
            validLastName: true,
            validEmail: true,
            validEmailMatch: true,
            validPhoneNumber: true,
            validPasswordMatch: true,
            validPassword: true,
            validAuth: true,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            newEmail: null,
            confirmEmail: null,
            emailNotAlreadyUsed: true,
            phoneNumber: this.props.user.phoneNumber,
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
            passwordNotAlreadyUsed: true
        })
    };

    getUpdatedFields = () => {
        const {firstName, lastName, newEmail, phoneNumber, user, currentPassword, newPassword} = this.state;
        let updatedUser = {};
        if (firstName !== this.props.user.firstName) {
            updatedUser.firstName = firstName
        }
        if (lastName !== this.props.user.lastName) {
            updatedUser.lastName = lastName
        }
        if (newEmail !== null) {
            updatedUser.email = newEmail
            updatedUser.currentPassword = currentPassword
        }
        if (phoneNumber !== this.props.user.phoneNumber) {
            updatedUser.phoneNumber = phoneNumber
        }
        if (newPassword !== null) {
            updatedUser.password = newPassword
            updatedUser.currentPassword = currentPassword
        }
        return updatedUser;
    }

    handleFirstNameChange = event => {
        this.setState({firstName: event}, async () => {
            await this.handleNameValidation(this.state.firstName, 'validFirstName').then(() => {
                this.validateNameFields();
            });
        })
    };

    handleLastNameChange = event => {
        this.setState({lastName: event}, async () => {
            await this.handleNameValidation(this.state.lastName, 'validLastName').then(() => {
                this.validateNameFields();
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

    validateNameFields = () => {
        const {firstName, lastName, validFirstName, validLastName} = this.state;
        this.setState({disableUpdateButton: false})
        if (firstName === this.props.user.firstName && lastName === this.props.user.lastName) {
            this.setState({disableUpdateButton: true})
        }
        if (!validFirstName || !validLastName) {
            this.setState({disableUpdateButton: true})
        }
    }

    handleNewEmail = event => {
        this.setState({newEmail: event})
    };

    handleConfirmEmail = event => {
        this.setState({confirmEmail: event})
    };

    handleEmailChange = async () => {
        const {newEmail, confirmEmail } = this.state;
        this.setState({disableUpdateButton: true,validEmailMatch: true, validEmail: true, validAuth: true, emailNotAlreadyUsed: true})
        if (!validator.isEmail(newEmail) || newEmail === null) {
            this.setState({
                validEmail: false,
                disableUpdateButton: false
            });
        } else if (newEmail !== confirmEmail) {
            this.setState({
                validEmailMatch: false,
                disableUpdateButton: false
            });
        } else {
            this.handleUpdate();
        }
    }

    handlePhoneNumberChange = event => {
        this.setState({phoneNumber: event}, async () => {
            await this.handlePhoneNumberValidation().then(() => {
                this.validatePhoneNumberFields();
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

    validatePhoneNumberFields = () => {
        const {phoneNumber, validPhoneNumber} = this.state;
        this.setState({disableUpdateButton: false})
        if (phoneNumber === this.props.user.phoneNumber) {
            this.setState({disableUpdateButton: true})
        }
        if (!validPhoneNumber) {
            this.setState({disableUpdateButton: true})
        }
    }

    handleCurrentPassword = event => {
        this.setState({currentPassword: event})
    }

    handleNewPasswordChange = event => {
        this.setState({newPassword: event})
    };

    handleConfirmPasswordChange = event => {
        this.setState({confirmPassword: event})
    };

    handlePasswordChange = () => {
        const {newPassword, confirmPassword} = this.state;
        this.setState({validPasswordMatch: true, validPassword: true, passwordNotAlreadyUsed: true})
        if (!passwordValidator.validate(newPassword)) {
            this.setState({
                validPassword: false,
                disableUpdateButton: false});
        }else if (newPassword !== confirmPassword) {
            this.setState({
                validPasswordMatch: false,
                disableUpdateButton: false});
        }else{
            this.handleUpdate();
        }
    };

    handleUpdate = async () => {
        const {user} = this.state;
        this.setState({disableUpdateButton: true})
        try {
            await updateUser(user.id, this.getUpdatedFields())
                .then(() => {
                    this.props.reloadUserProfile(true, user);
                });
        } catch (err) {
            if(err.message === "401"){
                this.setState({
                    validAuth: false,
                    disableUpdateButton: false
                })
            }else if(err.message === "409"){
                this.setState({
                    emailNotAlreadyUsed: false,
                    passwordNotAlreadyUsed: false,
                    disableUpdateButton: false
                })
            }
            
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
                handleNewEmail={this.handleNewEmail}
                handleConfirmEmail={this.handleConfirmEmail}
                handleEmailChange={this.handleEmailChange}
                handlePhoneNumberChange={this.handlePhoneNumberChange}
                handleCurrentPassword={this.handleCurrentPassword}
                handleNewPasswordChange={this.handleNewPasswordChange}
                handleConfirmPasswordChange={this.handleConfirmPasswordChange}
                handlePasswordChange={this.handlePasswordChange}
                goToChangeNamePage={this.goToChangeNamePage}
                goToUpdateEmailPage={this.goToUpdateEmailPage}
                goToUpdatePhoneNumberPage={this.goToUpdatePhoneNumberPage}
                goToChangePasswordPage={this.goToChangePasswordPage}
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
