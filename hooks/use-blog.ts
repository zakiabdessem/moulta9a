import { DEFAULT_URL } from '@/routes'
import { Blog, User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useBlogs = () => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('/api/blogs')
      return response.json()
    },
  })

  return { data, error, refetch, isLoading }
}

export async function useAdminBlog() {
  try {
    const response = await axios.get(`${DEFAULT_URL}/api/admin/blogs`, {
      withCredentials: true,
    })

    const data: Blog[] = await response.data

    return data
  } catch (error) {
    // console.log('🚀 ~ useAdminEvents ~ error:', error)
  }
}

export const createBlog = async (values: any) => {
  try {
    // Convert image file to Base64
    if (values.image && values.image[0]) {
      const base64Image = await convertFileToBase64(values.image[0])

      values.image = base64Image
    }

    // Send the form data with the Base64 image to the backend
    const response = await axios.post('/api/admin/blogs/create', values, {
      withCredentials: true,
    })

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

export const useBlogsManager = () => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await axios.get(`${DEFAULT_URL}/api/manager/blogs`, {
        withCredentials: true,
      })
      return response.data
    },
  })

  return { data, error, refetch, isLoading }
}

export const useBlog = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const response = await axios.get(`${DEFAULT_URL}/api/blogs/${id}`,{
        withCredentials: true,
      })
      return response.data
    },
  })

  return { data, isLoading } as { data: Blog & {
    user: User
  }, isLoading: boolean }
}
