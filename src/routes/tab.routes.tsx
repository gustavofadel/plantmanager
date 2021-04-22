import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { PlantSelect } from '../pages/PlantSelect'

import colors from '../styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { MyPlants } from '../pages/MyPlants'

const AppTab = createBottomTabNavigator()

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          height: 60
        }
      }}
    >
      <AppTab.Screen 
        component={PlantSelect}
        name='Nova Planta'
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              color={color}
              name='add-circle-outline'
              size={size}
            />
          ))
        }}
      />

      <AppTab.Screen 
        component={MyPlants}
        name='Minhas Plantas'
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              color={color}
              name='format-list-bulleted'
              size={size}
            />
          ))
        }}
      />
    </AppTab.Navigator>
  )
}

export default AuthRoutes