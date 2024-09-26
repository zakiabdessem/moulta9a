import { useQuery } from '@tanstack/react-query'

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

export const useAdminEvents = () => {
  const { data, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/admin/events')
      return response.json()
    },
  })

  console.log('🚀 ~ useEvents ~ data:', data)

  return { data, error, refetch }
}

