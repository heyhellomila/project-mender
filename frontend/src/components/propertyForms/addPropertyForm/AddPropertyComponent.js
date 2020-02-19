import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../../stylesheets/AddPropertyStyleSheet';
import Header from './Header';
import Footer from './Footer';
import AddressInfoComponent from './AddressInfoComponent';
import GeneralInfoComponent from './GeneralInfoComponent';
import { View } from 'react-native';

const AddPropertyComponent = (props) => {

    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={formStyles.container}>
            <View style={formStyles.header}>
                <Header {...props}/>
            </View>
            <View style={formStyles.body}>
                {props.step === 1 &&
                    <GeneralInfoComponent {...props}/>}
                {props.step === 2 &&
                    <AddressInfoComponent {...props}/>}
            </View>
            <View style={formStyles.footer}>
                <Footer {...props}/>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default AddPropertyComponent;
