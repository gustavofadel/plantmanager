import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { 
  RectButton, 
  RectButtonProps 
} from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantProps extends RectButtonProps {
  data: {
    name: string
    photo: string
    hour: string
  }

  handleRemove: () => void
}

export const PlantCardSecondary = ({ data, handleRemove, ...rest } : PlantProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              onPress={handleRemove}
              style={styles.removeButton}
            >
              <Feather
                color={colors.white} 
                name='trash' 
                size={32}  
              />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton 
        style={styles.container}
        {...rest}
      >
        <SvgFromUri 
          height={50}
          uri={data.photo}
          width={50} />
        
        <Text style={styles.title}>
          { data.name }
        </Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar às
          </Text>

          <Text style={styles.time}>
            { data.hour }
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 25,
    width: '100%'
  },

  details: {
    alignItems: 'flex-end'
  },

  removeButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 20,
    height: 85,
    justifyContent: 'center',
    marginTop: 15,
    position: 'relative',
    right: 15,
    width: 100
  },

  time: {
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 16,
    marginTop: 5
  },

  timeLabel: {
    color: colors.body_light,
    fontFamily: fonts.text,
    fontSize: 16,
    marginTop: 5
  },

  title: {
    color: colors.heading,
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginLeft: 10
  }
}) 