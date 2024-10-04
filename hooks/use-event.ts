import { DEFAULT_URL } from '@/routes'
import { Event } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useEvents = () => {
  const { data, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/events')
      return response.json()
    },
  })

  console.log('🚀 ~ useEvents ~ data:', data)

  return { data, error, refetch }
}

export async function useAdminEvents(){
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

    console.log('🚀 ~ After converting to Base64:', values)

    // Send the form data with the Base64 image to the backend
    const response = await axios.post('/api/admin/events/create', values, {
      withCredentials: true,
    })

    console.log('🚀 ~ //mutationFn: ~ response:', response)

    return { data: response.data }
  } catch (error) {
    console.error('Error creating event:', error)
    throw error
  }
}

// Helper function to convert file to Base64
const convertFileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      resolve(reader.result) // Return Base64 string
    }
    reader.onerror = reject
  })
}
