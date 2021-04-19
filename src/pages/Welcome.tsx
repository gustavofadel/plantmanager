import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'

import colors from '../styles/colors'
import wateringImg from '../assets/watering.png'

export function Welcome () {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>

      <Image 
        source={wateringImg} 
        style={styles.image} 
      />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar
      </Text>

      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {'>'}
        </Text>
      </TouchableOpacity>

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

  buttonText: {
    color: colors.white,
    fontSize: 24
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },

  image: {
    height: 284,
    width: 292
  },

  subtitle: {
    color: colors.heading,
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center'
  },

  title: {
    color: colors.heading,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 38,
    textAlign: 'center'
  }
})