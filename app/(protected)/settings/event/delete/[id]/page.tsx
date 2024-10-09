'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { showLoading, hideLoading } from 'loading-request'
import 'loading-request/dist/index.css'
import { TitlePage } from '@/app/(protected)/_components/PageTitle'
import axios from 'axios'
import { DEFAULT_URL } from '@/routes'

export default function DeleteEventPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')

  // Function to handle the deletion of the event
  const deleteEvent = async () => {
    try {
      // Show loading state
      showLoading({
        message: 'Deleting event...',
        spinnerColor: '#f3752b',
        textLoadingColor: '#EE5E09',
        textLoadingSize: '20px',
      })

      // Make a delete request to the backend to delete the event by its id
      await axios.delete(`/api/events/${id}`, {
        withCredentials: true,
      })

      hideLoading({ timeLoading: 1500 })

      // Use router.replace() for better behavior in certain contexts
      router.replace(`${DEFAULT_URL}/settings/event/delete/${id}`)
    } catch (error) {
      hideLoading({ timeLoading: 1500 })
      console.error('Error deleting event:', error)
      setError('Failed to delete event. Please try again.')
    }
  }

  return (
    <>
      <TitlePage>Delete Event</TitlePage>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col items-center space-y-4">
        <p>Are you sure you want to delete this event?</p>
        <Button className="text-white bg-red-600" onClick={deleteEvent}>
          Delete Event
        </Button>
        <Button
          className="text-white"
          onClick={() => router.push(`${DEFAULT_URL}/settings/event/`)}
        >
          Cancel
        </Button>
      </div>
    </>
  )
}
