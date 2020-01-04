import React from 'react';
import { View, Platform, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAdjustedScrollView} from 'react-native-keyboard-adjusted-scroll-view'
import ProfilePageComponent from '../../components/profileForms/ProfilePageComponent';
import EditProfileComponent from '../../components/profileForms/EditProfileComponent';
import ChangePasswordComponent from '../../components/profileForms/ChangePasswordComponent';
import {titleStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ProfilePageForm = (props) => {
    return(
        <KeyboardAdjustedScrollView contentContainerStyle={[containerStyles.mainContainer]}>
            {props.page === "profilePage" &&
            <ProfilePageComponent {...props} />}
            {props.page === "editProfilePage" &&
            <EditProfileComponent {...props}/>}
            {props.page === "passwordChangePage" &&
            <ChangePasswordComponent {...props} />}
        </KeyboardAdjustedScrollView>
    );
};

export default ProfilePageForm;