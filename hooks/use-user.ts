import { DEFAULT_URL } from '@/routes'
import { User } from '@prisma/client'
import axios from 'axios'

export async function useAdminUsers() {
  try {
    const response = await axios.get(`${DEFAULT_URL}/api/admin/users`, {
      withCredentials: true,
    })

    const data: User[] = await response.data

    return data
  } catch (error) {
    console.log('🚀 ~ useAdminUsers ~ error:', error)
  }
}
