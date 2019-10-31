import React from 'react';
import { StyleSheet, Text, View, Image, Input } from 'react-native';

export default class HomePage extends React.Component {
    static navigationOptions = {
        title: 'Home Page',
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1, flexDirection: 'row', marginTop: '2%', alignItems: 'center' }}>
                    <View style={{ marginLeft: '1%', width: '20%', justifyContent: 'flex-start' }}>
                        <Image style={{ width: 50, height: 50 }} source={require('../frontend/assets/menderlogo.png')} />
                    </View>
                    <View style={{ justifyContent: 'center', width: '60%' }}><Text style={{ textAlign: 'center' }}>4035 Saint-Ambroise</Text></View>
                    <View style={{ justifyContent: 'flex-end', marginRight: '1%' }}><Text>Button</Text></View>
                </View>
                <View style={{ flex: 0.1, alignItems: 'center'}}><Text style={{ fontSize: 30 }}>HI SEB</Text></View>
                <View style={{ flex: 0.05, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'black' }}>
                    <Text>SEARCH HERE</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: '#87cefa',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});