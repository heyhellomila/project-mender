import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateUser } from '../../src/apis/users/UpdateUser';
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
            page: 'profilePage',
            user: props.user,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
            newEmail: '',
            confirmEmail: '',
            phoneNumber: props.user.phoneNumber,
            newPhoneNumber: '',
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
            validConfirmPassword: true,
            validFirstName: true,
            validLastName: true,
            emailNotAlreadyUsed: true,
            validEmail: true,
            validEmailMatch: true,
            validAuth: true,
            validPhoneNumber: true,
            phoneNumberNotAlreadyUsed: true,
            validPasswordMatch: true,
            validPassword: true,
            passwordNotAlreadyUsed: true,
            updated: false,
            loading: false,
            submitting: false,
            emptyField: false,
            navigation: this.props.navigation,
            isSearchVisible: false
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

    goToHomePage = () => {
        this.props.navigation.navigate('HomePage');
    };

    goToChangeNamePage = () => {
        this.validateNameFields();
        this.setState({
            page: 'changeNamePage',
            submitting: false
        })
    };

    goToUpdateEmailPage = () => {
        this.setState({
            page: 'updateEmailPage',
            submitting: false
        })
    };

    goToUpdatePhoneNumberPage = () => {
        this.setState({
            page: 'updatePhoneNumberPage',
            submitting: false
        })
    };

    goToChangePasswordPage = () => {
        this.setState({
            page: 'passwordChangePage',
            submitting: false
        })
    };

    goToProfilePage = () => {
        this.setState({
            page: 'profilePage',
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
            newEmail: '',
            confirmEmail: '',
            emailNotAlreadyUsed: true,
            phoneNumber: this.props.user.phoneNumber,
            newPhoneNumber: '',
            phoneNumberNotAlreadyUsed: true,
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
            passwordNotAlreadyUsed: true,
            validConfirmPassword: true,
            emptyField: false
        })
    };

    getUpdatedFields = () => {
        const {firstName, lastName, newEmail, currentPassword, newPassword, newPhoneNumber} = this.state;
        let updatedUser = {};
        if (firstName !== this.props.user.firstName) {
            updatedUser.firstName = firstName
        }
        if (lastName !== this.props.user.lastName) {
            updatedUser.lastName = lastName
        }
        if (newEmail !== '') {
            updatedUser.email = newEmail;
            updatedUser.currentPassword = currentPassword
        }
        if (newPhoneNumber !== '') {
            updatedUser.phoneNumber = newPhoneNumber
        }
        if (newPassword !== null) {
            updatedUser.password = newPassword;
            updatedUser.currentPassword = currentPassword
        }
        return updatedUser;
    };

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
    };

    validateNameFields = () => {
        const {firstName, lastName, validFirstName, validLastName} = this.state;
        if (firstName === this.props.user.firstName && lastName === this.props.user.lastName) {
            return false;
        } else {
            return !(!validFirstName || !validLastName);
        }
    };

    handleNewEmail = event => {
        this.setState({newEmail: event})
    };

    handleConfirmEmail = event => {
        this.setState({confirmEmail: event})
    };

    handleEmailChange = async() => {
        const {newEmail, confirmEmail, currentPassword} = this.state;
        this.setState({
            submitting: true,
            validEmailMatch: true,
            validEmail: true,
            validAuth: true,
            validConfirmPassword: true,
            emailNotAlreadyUsed: true
        });
        if ( newEmail === '' || !validator.isEmail(newEmail)) {
            this.setState({
                validEmail: false
            });
        }
        if (newEmail !== confirmEmail || confirmEmail === '') {
            this.setState({
                validEmailMatch: false
            });
        }
        if(currentPassword === null || currentPassword === ''){
            this.setState({
                validConfirmPassword: false
            });
        }
        if (newEmail !== '' && validator.isEmail(newEmail) && newEmail === confirmEmail && currentPassword !== null && currentPassword !== '') {
            this.handleUpdate();
        } else {
            this.setState({
                submitting: false
            })
        }
    };

    handlePhoneNumber = event => {
        this.setState({newPhoneNumber: event})
    };

    handlePhoneNumberChange = async () => {
        const { newPhoneNumber } = this.state;
        this.setState({
            submitting: true,
            validPhoneNumber: true,
            phoneNumberNotAlreadyUsed: true,
            emptyField: false
        });
        if (newPhoneNumber === this.props.user.phoneNumber) {
            this.setState({phoneNumberNotAlreadyUsed: false})
        }
        if (newPhoneNumber === ''){
            this.setState({emptyField: true})
        } else if (!validatePhoneNumber(newPhoneNumber)){
            this.setState({validPhoneNumber: false})
        }
        if (newPhoneNumber !== this.props.user.phoneNumber && newPhoneNumber !== '' && validatePhoneNumber(newPhoneNumber)){
            this.handleUpdate();
        }else{
            this.setState({
                submitting: false
            })
        }
    };

    handleCurrentPassword = event => {
        this.setState({currentPassword: event})
    };

    handleNewPasswordChange = event => {
        this.setState({newPassword: event})
    };

    handleConfirmPasswordChange = event => {
        this.setState({confirmPassword: event})
    };

    handlePasswordChange = async () => {
        const {newPassword, confirmPassword, currentPassword} = this.state;
        this.setState({validConfirmPassword: true, validPasswordMatch: true, validPassword: true, passwordNotAlreadyUsed: true, validAuth: true});
        if (!passwordValidator.validate(newPassword)) {
            this.setState({
                validPassword: false
            });
        }
        if (newPassword !== confirmPassword || confirmPassword === null) {
            this.setState({
                validPasswordMatch: false
            });
        }
        if(currentPassword === null || currentPassword === ''){
            this.setState({
                validConfirmPassword: false
            });
        }
        if (passwordValidator.validate(newPassword) && newPassword === confirmPassword && currentPassword !== null && currentPassword !== ''){
            this.handleUpdate();
        }else{
            this.setState({
                submitting: false
            })
        }
    };

    handleUpdate = async () => {
        const {user} = this.state;
        this.setState({submitting: true});
        try {
            await updateUser(user.id, this.getUpdatedFields())
                .then(() => {
                    this.props.reloadUserProfile(true, user);
                })
        } catch (err) {
            if (err.message === '401') {
                this.setState({
                    validAuth: false,
                    submitting: false
                })
            } else if (err.message === '409') {
                this.setState({
                    emailNotAlreadyUsed: false,
                    passwordNotAlreadyUsed: false,
                    submitting: false
                })
            } else {
                alert(err.message);
            }
        }
    };

    async getUpdatedProfile() {
        await getUser(this.state.user.id)
            .then((response) => {
                this.props.reloadUserProfile(false, response.data);
                alert('Profile Updated');
                this.setState({
                    page: 'profilePage',
                    user: response.data,
                    loading: false
                })
            })
    }

    render() {
        return (
            <ProfilePageForm
                {...this.state}
                {...this.props}
                handleUpdate={this.handleUpdate}
                handleFirstNameChange={this.handleFirstNameChange}
                handleLastNameChange={this.handleLastNameChange}
                handleNewEmail={this.handleNewEmail}
                handleConfirmEmail={this.handleConfirmEmail}
                handleEmailChange={this.handleEmailChange}
                handlePhoneNumber={this.handlePhoneNumber}
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
                goToHomePage={this.goToHomePage}
                validateNameFields={this.validateNameFields}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    reloadUserProfile: (bool, user) => dispatch(reloadUserProfile(bool, user))
});

const mapStateToProps = (state) => ({
    user: state.user.user,
    reloadingUserProfile: state.user.reloadingUserProfile,
    loading: state.user.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
