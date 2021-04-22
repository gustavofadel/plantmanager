import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { EnvironmentButton } from '../components/EnvironmentButton'
import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardPrimary } from '../components/PlantCardPrimary'

import api from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentProps {
  key: string
  title: string
}

interface PlantProps {
  about: string
  environments: [string]
  frequency: {
    repeat_every: string
    times: number
  }
  id: string
  name: string
  photo: string
  water_tips: string
}

export function PlantSelect () {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [loadedAll, setLoadedAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')

  function handleSelectedEnvironment (environment: string) {
    setSelectedEnvironment(environment)

    if (environment === 'all') {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    )

    setFilteredPlants(filtered)
  }

  async function fetchPlants () {
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
    
    if (!data) {
      return setLoading(true)
    }

    if (page > 1) {
      setFilteredPlants(oldValue => [...oldValue, ...data])
      setPlants(oldValue => [...oldValue, ...data])
    }

    else {
      setFilteredPlants(data)
      setPlants(data)
    }
    
    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore (distance: number) {
    if (distance < 1) {
      return
    }

    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  useEffect(() => {
    async function fetchEnvironment () {
      const { data } = await api
      .get('plants_environments?_sort=title&_order=asc')
      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ])
    }

    fetchEnvironment()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          contentContainerStyle={styles.environmentList}
          data={environments}
          horizontal
          renderItem={({ item }) => (
            <EnvironmentButton 
              active={item.key === selectedEnvironment}
              onPress={() => handleSelectedEnvironment(item.key)}
              title={item.title}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
          renderItem={({ item }) => (
            <PlantCardPrimary 
              data={item}
            />
          )}
          onEndReached={({ distanceFromEnd }) => 
            handleFetchMore(distanceFromEnd)
          }
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 20,
    marginVertical: 32,
    paddingBottom: 5
  },

  header: {
    paddingHorizontal: 30
  },

  plants: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },

  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20
  },

  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 20,
    marginTop: 15
  }
})