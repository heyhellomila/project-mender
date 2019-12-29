import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {updateUser, updateUserPassword} from '../../src/apis/users/UpdateUser';
import {getUser} from '../../src/apis/users/GetUser';
import {reloadUserProfile} from '../redux/actions';
import ProfilePageComponent from '../components/profileForms/profilePageComponent';
import EditProfileForm from '../components/profileForms/editProfileForm';
import ChangePasswordForm from '../components/profileForms/changePasswordForm';
import {titleStyles, containerStyles} from '../stylesheets/ProfilePageStylesheet';
import validator from 'validator';
import passwordValidator from '../utils/PasswordUtils';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "profilePage",
            user: props.user,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
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
            loading: false
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
            page: "editProfilePage"
        })
    };

    goToPasswordChange = () => {
        this.setState({
            page: "passwordChangePage"
        })
    };

    goToProfilePage = () => {
        this.setState({
            page: "profilePage",
            validFirstName: true,
            validLastName: true,
            validEmail: true,
            validPhoneNumber: true,
            validPasswordMatch: true,
            validPassword: true,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            password: null,
            confirmPassword: null
        })
    };

    handleFirstNameChange = event => {
        this.setState({firstName: event}, () => {
            this.handleNameValidation(this.state.firstName, 'validFirstName');
        })
    };

    handleLastNameChange = event => {
        this.setState({lastName: event}, () => {
            this.handleNameValidation(this.state.lastName, 'validLastName');
        })
    };

    handleNameValidation = (input, validField) => {
        input.length > 0
            ? this.setState(
            {[validField]: true}
            )
            : this.setState({
                [validField]: false
            })
    }

    handleEmailChange = event => {
        this.setState({email: event}, () => {
            this.handleEmailValidation();
        })
    };

    handleEmailValidation = () => {
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
        this.setState({phoneNumber: event}, () => {
            this.handlePhoneNumberValidation();
        })
    };

    handlePhoneNumberValidation = () => {
        const {phoneNumber} = this.state;
        !this.validatePhoneNumber(phoneNumber)
            ? this.setState(
            {validPhoneNumber: false}
            )
            : this.setState({
                validPhoneNumber: true
            })
    }

    validatePhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (phoneNumber.length !== 10) {
            return false;
        } else {
            return true;
        }
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
        try {
            await updateUser(this.state.user.id, this.state.firstName, this.state.lastName, this.state.email, this.state.phoneNumber, this.state.password)
                .then(() => {
                    this.props.reloadUserProfile(true, this.state.user);
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
            <View style={containerStyles.mainContainer}>
                {this.state.page === "profilePage" &&
                <ProfilePageComponent {...this.state} goToEditProfilePage={this.goToEditProfilePage}
                                      goToPasswordChange={this.goToPasswordChange}/>}
                {this.state.page === "editProfilePage" &&
                <EditProfileForm {...this.state} goToProfilePage={this.goToProfilePage}
                                 handleUpdate={this.handleUpdate}
                                 handleFirstNameChange={this.handleFirstNameChange}
                                 handleLastNameChange={this.handleLastNameChange}
                                 handleEmailChange={this.handleEmailChange}
                                 handlePhoneNumberChange={this.handlePhoneNumberChange}/>}
                {this.state.page === "passwordChangePage" &&
                <ChangePasswordForm {...this.state} goToProfilePage={this.goToProfilePage}
                                    handleNewPasswordChange={this.handleNewPasswordChange}
                                    handleConfirmPasswordChange={this.handleConfirmPasswordChange}
                                    handlePasswordChange={this.handlePasswordChange}/>}
            </View>
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
