import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProfilePageComponent from '../../components/profileForms/ProfilePageComponent';
import ChangeNameComponent from '../../components/profileForms/ChangeNameComponent';
import ChangePasswordComponent from '../../components/profileForms/ChangePasswordComponent';
import ChangeEmailComponent from '../../components/profileForms/ChangeEmailComponent';
import ChangePhoneNumberComponent from '../../components/profileForms/ChangePhoneNumberComponent';
import Header from '../../components/profileForms/Header';
import {titleStyles, containerStyles, profilePageStyles} from '../../stylesheets/ProfilePageStylesheet';

const ProfilePageForm = (props) => {
    return (
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={containerStyles.mainContainer}>
            <View style={profilePageStyles.profilePageHeader}>
                <Header style page={props.page}/>
            </View>
            <View style={profilePageStyles.profilePageMainViews}>
                {props.page === "profilePage" &&
                <ProfilePageComponent {...props} />}
                {props.page === "changeNamePage" &&
                <ChangeNameComponent {...props}/>}
                {props.page === "passwordChangePage" &&
                <ChangePasswordComponent {...props} />}
                {props.page === "updateEmailPage" &&
                <ChangeEmailComponent {...props} />}
                {props.page === "updatePhoneNumberPage" &&
                <ChangePhoneNumberComponent {...props} />}
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ProfilePageForm;