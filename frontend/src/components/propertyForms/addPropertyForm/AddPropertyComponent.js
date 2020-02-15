import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../../stylesheets/AddPropertyStyleSheet';
import Header from './Header';
import Footer from './Footer';
import AddressInfoComponent from "./AddressInfoComponent";
import GeneralInfoComponent from "./GeneralInfoComponent";

const AddPropertyComponent = (props) => {

    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={formStyles.container}>
            <Header {...props}/>
            {props.step === 1 &&
                <GeneralInfoComponent {...props}/>}
            {props.step === 2 &&
                <AddressInfoComponent {...props}/>}
            <Footer {...props}/>
        </KeyboardAwareScrollView>
    );
};

export default AddPropertyComponent;
