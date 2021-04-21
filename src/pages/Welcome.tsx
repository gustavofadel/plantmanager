import React from 'react'
import { 
  Dimensions, 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import wateringImg from '../assets/watering.png'

export function Welcome () {
  const navigation = useNavigation()

  function handleStart () {
    navigation.navigate('UserIdentification')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          resizeMode='contain'
          source={wateringImg} 
          style={styles.image} 
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar
        </Text>

        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={handleStart} 
          style={styles.button}
        >
          <Feather 
            name='chevron-right'
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    marginBottom: 10,
    width: 56
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 32
  },

  container: {
    flex: 1
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
  },

  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center'
  },

  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
    marginTop: 38,
    textAlign: 'center'
  },

  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20
  }
})