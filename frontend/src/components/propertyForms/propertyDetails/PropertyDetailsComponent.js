import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyles } from '../../../stylesheets/PropertyDetailsStyleSheet';
import Header from './Header';
import Footer from './Footer';

const PropertyDetailsComponent = (props) => {
    return(
        <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={false}
                                 resetScrollToCoords={{ x: 0, y: 0 }} automaticallyAdjustContentInsets={false}
                                 contentContainerStyle={formStyles.container}>
            <ScrollView style={{ flex: 6}}>
                <View style={{flex: 1}}>
                    <Header {...props}/>
                </View>
                <View style={formStyles.bodyContainer}>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Property Type</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.propertyType.replace('_', ' ')}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Address</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.address}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>City</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.city}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Province</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.province}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Postal Code</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.postalCode}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Country</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.country}</Text>
                        </View>
                    </View>
                    <View style={formStyles.detailContainer}>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoHeader}>Name of Property</Text>
                        </View>
                        <View style={formStyles.rowContainer}>
                            <Text style={formStyles.infoText}>{props.property.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Footer {...props}/>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default PropertyDetailsComponent;
