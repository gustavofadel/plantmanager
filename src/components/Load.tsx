import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import LottieView from 'lottie-react-native'

import loadAnimation from '../assets/load.json'

export function Load () {
  return (
    <View style={styles.container}>
      <LottieView 
        autoPlay
        loop
        source={loadAnimation}
        style={styles.animation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animation: {
    backgroundColor: 'transparent',
    height: 200,
    width: 200
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})