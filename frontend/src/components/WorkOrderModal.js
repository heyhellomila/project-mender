import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { styles, buttons } from '../stylesheets/Stylesheet';

const WorkOrderModal = (props) => (
    <Modal visible={props.display} presentationStyle={"pageSheet"}animationType="slide"
        onRequestClose={() => console.log('closed')}>
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', borderWidth:2, borderColor: 'black'}}>
                <Text style={{textAlign:'center'}}>
                    SEB
                </Text>
                <View style={buttons.buttonSignUp}>
                    <Button onPress={() => props.closeModal()} title="close"></Button>
                </View>
            </View>
        </View>
    </Modal>
)


export default WorkOrderModal;