import { StyleSheet } from 'react-native';

const containerStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    }
})
const titleStyles = StyleSheet.create({
    title: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
})

const textInputStyles = StyleSheet.create({
  textInput:{
      height: 40, 
      borderBottomColor: 'gray', 
      borderBottomWidth: 1
  },
  invalidTextInput:{
      height: 40,
      borderBottomColor: 'red',
      borderBottomWidth: 1
  }
})

const buttonStyles = StyleSheet.create({
    bottomButtonsRow:{
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    bottomButtonsColumn:{
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
})

const imageStyles = StyleSheet.create({
    imageView:{
        flex: 1.5,
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    profileImage:{
        width: 75, 
        height: 75, 
        borderRadius: 75/2
    }
})

export { titleStyles, textInputStyles, buttonStyles, imageStyles, containerStyles };