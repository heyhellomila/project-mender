import {titleStyles, imageStyles} from '../../stylesheets/ProfilePageStylesheet';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';

const profilePicture = require('../../../assets/profileMender.png');

const Header = (props) => {
    return (
        <View style={{alignSelf: 'center'}}>
                {props.page === "profilePage" &&
                <Text>Account information & security</Text>}
                {props.page === "changeNamePage" &&
                <Text >Change your name</Text>}
                {props.page === "passwordChangePage" &&
                <Text>Change your password</Text>}
                {props.page === "updateEmailPage" &&
                <Text>Change your email address</Text>}
                {props.page === "updatePhoneNumberPage" &&
                <Text>Change your phone number</Text>}
        </View>
    );
};

export default Header;