import { DEFAULT_URL } from '@/routes'
import { convertFileToBase64, isBase64 } from '@/util/Image'
import { Event, Speaker } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useEvents = () => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/events')
      return response.json()
    },
  })

  console.log('🚀 ~ useEvents ~ data:', data)

  return { data, error, refetch, isLoading }
}

export const useEvent = (id: string) => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get(`${DEFAULT_URL}/api/events/${id}`)
      console.log('🚀 ~ queryFn: ~ response:', response)

      return response.data as Event & { speakers: Speaker[] }
    },
  })

  console.log('🚀 ~ useEvents ~ data:', data)

  return { data, error, refetch, isLoading }
}

export const useEventsManager = () => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get(`${DEFAULT_URL}/api/manager/events`, {
        withCredentials: true,
      })
      return response.data
    },
  })

  return { data, error, refetch, isLoading }
}

export async function useAdminEvents() {
  try {
    const response = await axios.get(`${DEFAULT_URL}/api/admin/events`, {
      withCredentials: true,
    })

    const data: Event[] = await response.data

    return data
  } catch (error) {
    // console.log('🚀 ~ useAdminEvents ~ error:', error)
  }
}

export const useCreateEvent = async (values: any) => {
  try {
    console.log('🚀 ~ Before converting to Base64:', values)

    // Convert image file to Base64
    if (values.image && values.image[0]) {
      const base64Image = await convertFileToBase64(values.image[0])
      values.image = base64Image
    }

    // Send the form data with the Base64 image to the backend
    const response = await axios.post('/api/admin/events/create', values, {
      withCredentials: true,
    })

    return { data: response.data }
  } catch (error) {
    //console.error('Error creating event:', error)
    throw error
  }
}

export const useUpdateEvent = async (id: string, values: any) => {
  try {
    console.log('🚀 ~ Before converting to Base64:', values)

    // Convert main image to Base64 if it's a file and not already in Base64 format
    if (
      values.image &&
      values.image[0] instanceof Blob &&
      !isBase64(values.image[0] as any)
    ) {
      const base64Image = await convertFileToBase64(values.image[0] as any)
      values.image = base64Image
    }

    // Convert speaker images to Base64 if necessary
    if (values.speakers && values.speakers.length > 0) {
      values.speakers = await Promise.all(
        values.speakers.map(async (speaker: any) => {
          // Check if the speaker image is a file (Blob)
          if (speaker.image && speaker.image[0] instanceof Blob) {
            console.log('🚀 ~ Converting speaker image to Base64:', speaker)
            const base64Image = await convertFileToBase64(
              speaker.image[0] as any
            )
            speaker.image = base64Image
          }

          return speaker
        })
      )
    }

    console.log('🚀 ~ After converting to Base64:', values)

    // Send the form data with the Base64 image to the backend
    const response = await axios.put(`/api/events/${id}`, values, {
      withCredentials: true,
    })

    console.log('🚀 ~ //mutationFn: ~ response:', response)

    return { data: response.data }
  } catch (error) {
    console.error('Error updating event:', error)
    throw error
  }
}

export const useDeleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`/api/events/${id}`, {
      withCredentials: true,
    })

    return { data: response.data }
  } catch (error) {
    console.error('Error deleting event:', error)
    throw error
  }
}
