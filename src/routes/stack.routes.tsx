import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Confirmation } from '../pages/Confirmation'
import { PlantSave } from '../pages/PlantSave'
import { UserIdentification } from '../pages/UserIdentification'
import { Welcome } from '../pages/Welcome'

import colors from '../styles/colors'
import AuthRoutes from './tab.routes'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <stackRoutes.Screen 
      component={Welcome}
      name='Welcome'
    />

    <stackRoutes.Screen 
      component={UserIdentification}
      name='UserIdentification'
    /> 

    <stackRoutes.Screen 
      component={Confirmation}
      name='Confirmation'
    />  

    <stackRoutes.Screen 
      component={AuthRoutes}
      name='PlantSelect'
    />

    <stackRoutes.Screen
      component={PlantSave}
      name='PlantSave'
    />

    <stackRoutes.Screen
      component={AuthRoutes}
      name='MyPlants'
    />
  </stackRoutes.Navigator>
)

export default AppRoutes