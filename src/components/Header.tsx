import React, { useEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../styles/colors'
import userImg from '../assets/kirito.png'
import fonts from '../styles/fonts'

export function Header () {
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function loadStorageUserName () {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      setUserName(user || '')
    }

    loadStorageUserName()
  }, [userName])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>
          {userName}
        </Text>
      </View>

      <Image 
        source={userImg} 
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight(),
    paddingVertical: 20,
    width: '100%'
  },

  greeting: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 32
  },

  image: {
    borderRadius: 35,
    height: 70,
    width: 70
  },

  userName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 40
  }
})