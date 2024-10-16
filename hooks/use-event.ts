import { DEFAULT_URL } from '@/routes'
import { convertFileToBase64, isBase64 } from '@/util/Image'
import { Event, Speaker } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useEvents = () => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/events')
      return response.json()
    },
    staleTime: 0, // Always refetch when data is queried
    refetchOnWindowFocus: true, // Refetch on window focus
    refetchOnMount: true, // Refetch when the component mounts
    refetchOnReconnect: true, // Refetch when the browser regains network connection
  })

  return { data, error, refetch, isLoading }
}

export const useUpcomingEvents = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('/api/upcoming')
        setData(response.data)
      } catch (err) {
        setError(err as any)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { data, isLoading, error }
}

export const useEvent = (id: string) => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get(`${DEFAULT_URL}/api/events/${id}`)

      return response.data as Event & { speakers: Speaker[] }
    },
  })

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

export async function fetchAdminEvents() {
  try {
    const response = await axios.get(`${DEFAULT_URL}/api/admin/events`, {
      withCredentials: true,
    })

    const data: Event[] = await response.data

    return data
  } catch (error) {
    console.log('🚀 ~ useAdminEvents ~ error:', error)
  }
}

export const createEvent = async (values: any) => {
  try {
    // Convert image file to Base64
    if (values.image && values.image[0]) {
      const base64Image = await convertFileToBase64(values.image[0])
      values.image = base64Image
    }

    // Send the form data with the Base64 image to the backend
    const response = await axios.post('/api/manager/events/create', values, {
      withCredentials: true,
    })

    return { data: response.data }
  } catch (error) {
    console.error('Error creating event:', error)
    throw error
  }
}

export const updateEvent = async (id: string, values: any) => {
  try {
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
            const base64Image = await convertFileToBase64(
              speaker.image[0] as any
            )
            speaker.image = base64Image
          }

          return speaker
        })
      )
    }

    // Send the form data with the Base64 image to the backend
    const response = await axios.put(`/api/events/${id}`, values, {
      withCredentials: true,
    })

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

export const fetchEventAttendee = async (id: string) => {
  try {
    const response = await axios.get(`/api/events/attendees/${id}`, {
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.error('Error getting event attendees:', error)
    throw error
  }
}
