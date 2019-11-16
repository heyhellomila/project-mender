import React from 'react';
import Header from './Header';
import { View, Platform, StatusBar } from 'react-native';
import  { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChooseSector from './ChooseSector';
import Overview from './Overview';
import Details from './Details';
import Footer from './Footer';
import { fromStyles } from '../../stylesheets/CreateWorkOrderPageStyleSheet';

const WorkOrderForm = (props) => {
    return(
        <KeyboardAwareScrollView scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={{flex: 6, paddingHorizontal: '5%', backgroundColor: '#f0f0f0',
            paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0}}>
            <View style={{flex: 1}}>
                <Header {...props} headerText={props.headerText}/>
            </View>
            <View style={{flex: 4}}>
                {props.step === 1 &&
                    <ChooseSector {...props}/>}
                {props.step === 2 &&
                    <Overview {...props}/>}
                {props.step === 3 && 
                    <Details {...props}/>}
            </View>
            <View style={{flex: 1}}>
                <Footer {...props}/>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default WorkOrderForm;