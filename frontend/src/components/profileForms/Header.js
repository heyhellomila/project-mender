import {titleStyles, imageStyles} from '../../stylesheets/ProfilePageStylesheet';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';

const profilePicture = require('../../../assets/profileMender.png');

const Header = (props) => {
    return (
        <View style={{alignSelf: 'center'}}>
                {props.page === "profilePage" &&
                <Text>Profile Page</Text>}
                {props.page === "changeNamePage" &&
                <Text >Change Name</Text>}
                {props.page === "passwordChangePage" &&
                <Text>Change Password</Text>}
                {props.page === "updateEmailPage" &&
                <Text>Update Email</Text>}
                {props.page === "updatePhoneNumberPage" &&
                <Text>Update Phone Number</Text>}
        </View>
    );
};

export default Header;