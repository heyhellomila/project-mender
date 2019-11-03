import React from 'react'
import { Modal, View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const WorkOrderModal = (props) => (
  <Modal visible={ props.display } animationType = "slide" 
         onRequestClose={ () => console.log('closed') }>
    <View>
      <Text style = { styles.text }>
        SEB
      </Text>
      <Button onPress= {() => props.closeDisplay()} title="close"></Button>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200
  },
  text: {
    fontSize: 20,
    marginLeft: 150
  }
})

export default WorkOrderModal;