import React from 'react';
import Header from './Header';
import { View, Platform, StatusBar } from 'react-native';
import  { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChooseSectorType from './ChooseSectorType';
import Overview from './Overview';
import Details from './Details';
import Footer from './Footer';
import { formStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';
import ChooseSectorKind from './ChooseSectorKind';
import ChooseType from './ChooseType';

const WorkOrderForm = (props) => {
    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false} 
            resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
            contentContainerStyle={[formStyles.container, {paddingTop: 
                (Platform.OS === 'android' || Platform.OS === 'ios') ? StatusBar.currentHeight : 0}]}>
            <View style={{flex: 1}}>
                <Header {...props} headerText={props.headerText}/>
            </View>
            <View style={formStyles.bodyContainer}>
                <View style={{flex: 4}}>
                    {props.step === 1 &&
                        <ChooseType {...props}/>}
                    {props.step === 2 &&
                        <ChooseSectorType {...props}/>}
                    {props.step === 3 &&
                        <ChooseSectorKind {...props}/>}
                    {props.step === 4 &&
                        <Overview {...props}/>}
                    {props.step === 5 &&
                        <Details {...props}/>}
                </View>
            </View>
            <View style={{flex: 1}}>
                <Footer {...props}/>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default WorkOrderForm;