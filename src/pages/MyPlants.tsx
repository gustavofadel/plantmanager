import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { loadPlant, PlantProps, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardSecondary } from '../components/PlantCardSecondary'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import waterdrop from '../assets/waterdrop.png'


export function MyPlants () {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatering, setNextWatering] = useState<string>()

  function handleRemove (plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover ${plant.name}?`, [
      {
        style: 'cancel',
        text: 'Não 🙏'
      },

      {
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            )
          } catch (error) {
            Alert.alert('Não foi possível remover. 😢')
          }
        },
        text: 'Sim 😢'
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData () {
      const storagedPlants = await loadPlant()
      const nextTime = formatDistance(
        new Date(storagedPlants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      )

      setNextWatering(
        `Não esqueça de regar ${storagedPlants[0].name} daqui a ${nextTime}`
      )

      setMyPlants(storagedPlants)
      setLoading(false)
    }

    loadStorageData()
  }, [])

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image
          source={waterdrop}
          style={styles.spotlightImage}
        />

        <Text style={styles.spotlightText}>
          { nextWatering }
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary 
              data={item} 
              handleRemove={() => {handleRemove(item)}}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },

  plants: {
    flex: 1,
    width: '100%'
  },

  plantsTitle: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginVertical: 20
  },

  spotlight: {
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    flexDirection: 'row',
    height: 110,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  spotlightImage: {
    height: 60,
    width: 60
  },

  spotlightText: {
    color: colors.blue,
    flex: 1,
    fontFamily: fonts.text,
    paddingHorizontal: 20,
  }
})