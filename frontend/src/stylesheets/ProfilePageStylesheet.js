import { StyleSheet } from 'react-native';

const containerStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%'
    },
    profilePageContainer:{
        flex: 4,
        width: '90%'
    },
    changeComponentContainer:{
        flex: 4, 
        width: '90%', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

const profilePageStyles = StyleSheet.create({
    profilePageRows:{
        flex: 0.3,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    profilePageInsideRows:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    profilePageHeader:{
        flex: 0.5, 
        width: '75%', 
        justifyContent: 'center', 
        borderBottomColor: 'black', 
        borderBottomWidth: 2
    },
    profilePageMainViews:{
        flex: 5, 
        width: '100%'
    },
    profilePageBoldText:{
      fontWeight: 'bold'
    },
    profilePageJustifyContentStart:{
        justifyContent: 'flex-start'
    },
    profilePageJustifyContentEnd:{
        justifyContent: 'flex-end'
    },
    profilePageUnderlineText:{
        textDecorationLine: 'underline'
    },
    profilePageButtonText:{
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    profilePageBackHome:{
        flex: 2, 
        justifyContent:'center'
    }
})

const changeProfileComponentStyles = StyleSheet.create({
    changeProfileInsideComponent:{
        flex: 3, 
        width: '90%'  
    },
    changeProfileInsideComponentRows:{
        flex: 0.3,
        justifyContent: 'center'
    },
    changeProfileInsideComponentNormalRows:{
        flex: 0.3
    },
    changeProfileInputComponent:{
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    changeProfileTextAlignSelf:{
        alignSelf: 'center'
    },
    changeProfileInvalidText:{
        color: 'red', 
        alignSelf: 'center'
    },
    changeProfileUnderLineText:{
        textDecorationLine: 'underline'
    },
    changeProfileConfirmButton:{
        alignSelf: 'center', 
        width: '50%'
    },
    changeProfileBackButton:{
        alignSelf: 'center', 
        paddingTop: '10%'
    },
    changeProfileBottomNormalRow:{
        flex: 2
    },
    changeProfileButtonText:{
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    }
})

const titleStyles = StyleSheet.create({
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
})

const textInputStyles = StyleSheet.create({
  textInput:{
      fontSize: 16,
      textAlign: 'center',
      backgroundColor: '#ffffff',
      borderColor: '#cccccc',
      borderWidth: 1,
      alignSelf: 'center',
      width: '70%',
      paddingVertical: '2%',
      borderRadius: 4
  },
  invalidTextInput:{
      fontSize: 16,
      textAlign: 'center',
      backgroundColor: '#ffffff',
      borderColor: 'red',
      borderWidth: 1,
      alignSelf: 'center',
      width: '70%',
      paddingVertical: '2%',
      borderRadius: 4
  }
})

const buttonStyles = StyleSheet.create({
    bottomButtonsRow:{
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    bottomButtonsColumn:{
        flex: 3,
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    buttonConfirm:{
        display: 'flex',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20
    },
    buttonConfirmDisabled:{
        display: 'flex',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#ABB8C3',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20
    }
})

const imageStyles = StyleSheet.create({
    imageView:{
        flex: 1.5,
        width: '90%',
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    profileImage:{
        width: 75, 
        height: 75, 
        borderRadius: 75/2
    }
})

export { titleStyles, textInputStyles, buttonStyles, imageStyles, containerStyles, profilePageStyles, changeProfileComponentStyles };