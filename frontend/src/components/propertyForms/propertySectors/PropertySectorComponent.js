import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../../stylesheets/PropertyDetailsStyleSheet';
import Header from './Header';
import { View } from 'react-native';
import PropertySectorTypeComponent from './PropertySectorTypeComponent';
import PropertySectorKindComponent from './PropertySectorKindComponent';
import Footer from './Footer';

const PropertySectorComponent = (props) => {
    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={formStyles.container}>
            <View style={{flex: 1}}>
                <Header {...props}/>
            </View>
            <View style={{flex: 4, paddingHorizontal: '4%'}}>
                {props.sectorType === ''
                    ? <PropertySectorTypeComponent {...props}/>
                    : <PropertySectorKindComponent {...props}/>
                }
            </View>
            <View style={{flex: 1}}>
                <Footer {...props}/>
            </View>
        </KeyboardAwareScrollView>
    )
};

export default PropertySectorComponent;
