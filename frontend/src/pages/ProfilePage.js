import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';
import { updateUser, updateUserPassword } from '../../src/apis/users/UpdateUser';
import ProfilePageComponent from '../components/profileForms/profilePageComponent';
import EditProfileForm from '../components/profileForms/editProfileForm';
import ChangePasswordForm from '../components/profileForms/changePasswordForm';

const profilePicture = require('../../assets/jisooProfile.png');

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            user: props.user,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            password: null,
            confirmPassword: null,
            errorMsg: null,
            validatePassword: false
        }
    }
    goToEditProfilePage = () => {
        const { step } = this.state;
        this.setState({
            step: 2
        })
    }
    goToPasswordChange = () =>{
        const { step } = this.state;
        this.setState({
            step: 3
        })
    }
    goToProfilePage = () => {
        const { step } = this.state;
        this.setState({
            step: 1,
            validatePassword: false
        })
    }
    handleFirstNameChange = event => {
        this.setState({firstName: event})
    }
    handleLastNameChange = event => {
        this.setState({lastName: event})
    }
    handleEmailChange = event => {
        this.setState({email: event})
    }
    handlePhoneNumberChange = event => {
        this.setState({phoneNumber: event})
    }
    handleNewPasswordChange = event => {
        this.setState({password: event})
    }
    handleConfirmPasswordChange = event => {
        this.setState({confirmPassword: event})
    }
    handlePasswordChange = async () => {
        if(this.state.password != null && (this.state.password == this.state.confirmPassword)) {
            try{
                await updateUserPassword(this.state.user.id, this.state.password).then(async (response) =>{
                    const { step } = this.state;
                    this.setState({
                        step: 1
                    })
                });
            }catch(err){
                this.setState({errorMsg: err.message})
            }
        }else{
           this.setState({
               validatePassword: true
           })
        }
    }
    handleUpdate = async () => {
        try {
            await updateUser(this.state.user.id, this.state.firstName, this.state.lastName, this.state.email, this.state.phoneNumber)
                .then(async (response) => {
                    const { step } = this.state;
                    this.setState({
                        step: 1
                    })
            });
        } catch (err) {
            this.setState({errorMsg: err.message})
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.step === 1 && <ProfilePageComponent {...this.state} goToEditProfilePage={this.goToEditProfilePage} 
                                                                goToPasswordChange={this.goToPasswordChange}/>}
                {this.state.step === 2 && <EditProfileForm {...this.state} goToProfilePage={this.goToProfilePage}
                                                           handleUpdate={this.handleUpdate} handleFirstNameChange={this.handleFirstNameChange}
                                                           handleLastNameChange={this.handleLastNameChange} handleEmailChange={this.handleEmailChange}
                                                           handlePhoneNumberChange={this.handlePhoneNumberChange}/>}
                {this.state.step === 3 && <ChangePasswordForm {...this.state} goToProfilePage={this.goToProfilePage}
                                                              handleNewPasswordChange={this.handleNewPasswordChange}
                                                              handleConfirmPasswordChange={this.handleConfirmPasswordChange}
                                                              handlePasswordChange={this.handlePasswordChange}/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

const mapStateToProps = (state) => ({
    user: state.user.user,
});

export default connect(mapStateToProps, null)(ProfilePage);
