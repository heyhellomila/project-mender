import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { styles, buttons } from '../stylesheets/Stylesheet';

const WorkOrderModal = (props) => (
    <Modal visible={props.display} transparent={true} animationType="fade"
        onRequestClose={() => props.closeModal()} >
        <View style={{ justifyContent: 'center', borderWidth: 2, borderColor: 'black', marginVertical: '25%', marginHorizontal: '5%', height: '75%', width: '90%', backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
                <View style={buttons.buttonSignUp}>
                    <Button onPress={() => props.closeModal()} title="close"></Button>
                </View>
        </View>
    </Modal>
)

export default WorkOrderModal;
