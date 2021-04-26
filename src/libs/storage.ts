import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { format } from 'date-fns'

export interface PlantProps {
  about: string
  dateTimeNotification: Date
  environments: [string]
  frequency: {
    repeat_every: string
    times: number
  }
  hour: string
  id: string
  name: string
  photo: string
  water_tips: string
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps
    notificationId: string
  }
}

export async function savePlant (plant: PlantProps) : Promise<void> {
  try {
    const nextTime = new Date(plant.dateTimeNotification)
    const currentTime = new Date()
    const { times, repeat_every } = plant.frequency

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times)
      nextTime.setDate(currentTime.getDate() + interval)
    }

    else {
      nextTime.setDate(nextTime.getDate() + 1)
    }

    const seconds = Math.abs(
      Math.ceil((currentTime.getTime() - nextTime.getTime()) / 1000)
    )

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        body: `Está na hora de cuidar da sua ${plant.name}`,
        data: {
          plant
        },
        priority: Notifications.AndroidNotificationPriority.HIGH,
        sound: true,
        title: 'Heeey, 🌱',
      },
      trigger: {
        repeats: true,
        seconds: seconds < 60 ? 60 : seconds
      }
    })

    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
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

export async function removePlant (id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants')
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId) 

  delete plants[id]

  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))
}