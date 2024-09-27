import { useMutation, useQuery } from '@tanstack/react-query'

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

export const useCreateEvent = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async (values: any) => {
      console.log('🚀 ~ mutationFn: ~ values:', values)

      //handle values.image from File to base64
      const file = values.image
      const reader = new FileReader()
      reader.readAsDataURL(file[0])
      reader.onloadend = () => {
        const base64data = reader.result
        values.image = base64data
      }

      // const response = await fetch('/api/events/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // })
      // return response.json()
    },
  })

  return { mutate, ...rest }
}
