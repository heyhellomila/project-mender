import { DrawerItems } from 'react-navigation-drawer';
import { Image, View, Text, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

const menderLogo = require('../../assets/menderlogo.png');

const DrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1, paddingTop: (Platform.OS === "android" || Platform.OS === "ios") ? StatusBar.currentHeight : 0 }}>
        <View style={{ flex: 2, height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={menderLogo} style={{ height: 120, width: 120 }} />
        </View>
        <View style={{ flex: 3 }}>
            <Text>PROPERTIES</Text>
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
        <View style={{ flex: 1 }}>
            <View style={{alignSelf:'flex-end', width:'50%'}}>
                <Button title='LOG OUT'></Button>
            </View>
        </View>
    </SafeAreaView>
)

export default DrawerComponent;
