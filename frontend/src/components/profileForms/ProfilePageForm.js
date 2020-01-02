import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProfilePageComponent from '../../components/profileForms/ProfilePageComponent';
import EditProfileForm from '../../components/profileForms/EditProfileForm';
import ChangePasswordForm from '../../components/profileForms/ChangePasswordForm';
import {titleStyles, containerStyles} from '../../stylesheets/ProfilePageStylesheet';

const ProfilePageForm = (props) => {
    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={[containerStyles.mainContainer, {paddingTop:
                                         (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0}]}>
            {props.page === "profilePage" &&
            <ProfilePageComponent {...props} />}
            {props.page === "editProfilePage" &&
            <EditProfileForm {...props}/>}
            {props.page === "passwordChangePage" &&
            <ChangePasswordForm {...props} />}
        </KeyboardAwareScrollView>
    );
};

export default ProfilePageForm;