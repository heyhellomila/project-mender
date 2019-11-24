import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { View, Platform, StatusBar } from 'react-native';
import  { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../stylesheets/SignUpFormStyleSheet';
import NameComponent from './NameComponent';
import TypeComponent from './TypeComponent';
import BusinessComponent from './BusinessComponent';
import AccountInfoComponent from './AccountInfoComponent';

const SignUpForm = (props) => {
    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false} 
            resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
            contentContainerStyle={[formStyles.container, {paddingTop: 
                (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0}]}>
            <View style={{flex: 1}}>
                <Header step = {props.step}/>
            </View>
            <View style={{flex: 4}}>
                {props.step === 1 && <NameComponent {...props}/>}
                {props.step === 2 && <TypeComponent {...props}/>}
                {props.step === 3 && <BusinessComponent {...props}/>}
                {props.step === 4 && <AccountInfoComponent {...props}/>}
            </View>
            <View style={{flex: 1}}>
                <Footer {...props}/>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default SignUpForm;