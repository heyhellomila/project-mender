import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button} from 'react-native';
import {buttonStyles, containerStyles, imageStyles, profilePageStyles} from '../../stylesheets/ProfilePageStylesheet';

const profilePicture = require('../../../assets/profileMender.png');

const ProfilePageComponent = (props) => {
    return (
        <View style={containerStyles.container}>
            <View style={imageStyles.imageView}>
                <Image
                    style={imageStyles.profileImage}
                    source={profilePicture}/>
                {/*<TouchableOpacity><Text style={{alignSelf: 'center'}}>Change Profile Picture</Text></TouchableOpacity>*/}
            </View>
            <View style={containerStyles.profilePageContainer}>
                <View style={profilePageStyles.profilePageRows}>
                    <View style={profilePageStyles.profilePageInsideRows}>
                        <View style={profilePageStyles.profilePageJustifyContentStart}><Text>
                            <Text style={profilePageStyles.profilePageBoldText}>Name: </Text>
                            <Text>{props.user.firstName} {props.user.lastName}</Text>
                        </Text>
                        </View>
                        <View style={profilePageStyles.profilePageJustifyContentEnd}>
                            <TouchableOpacity
                                onPress={() => props.goToChangeNamePage()}><Text
                                style={profilePageStyles.profilePageButtonText}>EDIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={profilePageStyles.profilePageRows}>
                    <View style={profilePageStyles.profilePageInsideRows}>
                        <View style={profilePageStyles.profilePageJustifyContentStart}>
                            <Text>
                                <Text style={profilePageStyles.profilePageBoldText}>Email: </Text>
                                <Text>{props.user.email}</Text>
                        </Text>
                    </View>
                    <View style={profilePageStyles.profilePageJustifyContentEnd}>
                        <TouchableOpacity
                            onPress={() => props.goToUpdateEmailPage()}><Text
                            style={profilePageStyles.profilePageButtonText}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={profilePageStyles.profilePageRows}>
                <View style={profilePageStyles.profilePageInsideRows}>
                    <View style={profilePageStyles.profilePageJustifyContentStart}>
                        <Text>
                            <Text style={profilePageStyles.profilePageBoldText}>Phone Number: </Text>
                            <Text>{props.user.phoneNumber}</Text>
                        </Text>
                    </View>
                    <View style={profilePageStyles.profilePageJustifyContentEnd}>
                        <TouchableOpacity
                            onPress={() => props.goToUpdatePhoneNumberPage()}><Text
                            style={profilePageStyles.profilePageButtonText}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={profilePageStyles.profilePageRows}>
                <View style={profilePageStyles.profilePageInsideRows}>
                    <View style={profilePageStyles.profilePageJustifyContentStart}>
                        <Text>
                            <Text style={profilePageStyles.profilePageBoldText}>Password: </Text>
                            <Text>********</Text>
                        </Text>
                    </View>
                    <View style={profilePageStyles.profilePageJustifyContentEnd}>
                        <TouchableOpacity
                            onPress={() => props.goToChangePasswordPage()}><Text
                            style={profilePageStyles.profilePageButtonText}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    <View style={profilePageStyles.profilePageBackHome}>
        <View style={profilePageStyles.profilePageJustifyContentEnd}>
            <TouchableOpacity
                onPress={() => props.goToHomePage()}><Text style={profilePageStyles.profilePageButtonText}>BACK TO
                HOME</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>
)
    ;
}

export default ProfilePageComponent;