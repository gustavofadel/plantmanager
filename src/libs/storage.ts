import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'

export interface PlantProps {
  about: string
  dateTimeNotification: Date
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

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps
  }
}

export async function savePlant (plant: PlantProps) : Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    const newPlant = {
      [plant.id]: {
        data: plant
      }
    }

    await AsyncStorage.setItem('@plantmanager:plants', 
      JSON.stringify({
        ...newPlant,
        ...oldPlants
      })
    )
  } catch (error) {
    throw new Error(error)
  }
}

export async function loadPlant () : Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    const sortedPlants = Object
    .keys(plants)
    .map((plant) => {
      return {
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
      }
    })
    .sort((a, b) =>
      Math.floor(
        new Date(a.dateTimeNotification).getTime() / 1000 -
        Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
      )
    )

    return sortedPlants
  } catch (error) {
    throw new Error(error)
  }
}