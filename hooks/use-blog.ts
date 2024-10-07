import { DEFAULT_URL } from '@/routes'
import { Blog } from '@prisma/client'
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

  console.log('🚀 ~ useBlogs ~ data:', data)

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

export const useCreateBlog = async (values: any) => {
  try {
    console.log('🚀 ~ Before converting to Base64:', values)

    // Convert image file to Base64
    if (values.image && values.image[0]) {
      const base64Image = await convertFileToBase64(values.image[0])
      console.log('🚀 ~ useCreateBlog ~ base64Image:', base64Image)

      values.image = base64Image
    }

    console.log('🚀 ~ After converting to Base64:', values)

    // Send the form data with the Base64 image to the backend
    const response = await axios.post('/api/admin/blogs/create', values, {
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
