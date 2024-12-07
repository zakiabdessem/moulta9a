'use client'
import { TitlePage } from '@/app/(protected)/_components/PageTitle'
import { Button } from '@/components/ui/button'
import { showLoading, hideLoading } from 'loading-request'
import 'loading-request/dist/index.css'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { EventSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { useEvent, updateEvent } from '@/hooks/use-event'
import { Calendar } from '@/components/ui/calendar'
import { DEFAULT_URL } from '@/routes'
import { redirect, useParams, useRouter } from 'next/navigation'
import SpeakerFieldArray from '@/app/(protected)/_components/SpeakerField'
import { uploadImage } from '@/actions/cloudinary'
import { Navbar } from '@/app/(protected)/_components/navbar'
import { Event } from '@prisma/client'
import { convertFileToBase64 } from '@/util/Image'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';


export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useEvent(id)

  if (!data) {
    return <div>Loading...</div>
  }

  return <EditEventPage event={data} />
}

function EditEventPage({
  event,
}: {
  event: Event & {
    speakers: {
      name: string
      bio: string
      image: string
    }[]
  }
}) {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: event.title || '',
      image: event.image || '',
      description: event.description || '',
      dateRange: {
        from: new Date(event.dateRangeFrom),
        to: new Date(event.dateRangeTo),
      },
      enrollDeadline: new Date(event.enrollDeadline),
      location: event.location || '',
      isPaid: event.isPaid || false,
      capacity: event.capacity || 1,
      price: event.price || 0,
      speakers: event.speakers || [],
    },
  })

  // Check for form errors
  useEffect(() => {
    if (form.formState.errors) {
      setError('Please check the form for errors')
    }
  }, [form.formState.errors])

  const onSubmit = async (values: any) => {
    try {
      showLoading({
        message: 'Loading...',
        spinnerColor: '#f3752b',
        textLoadingColor: '#EE5E09',
        textLoadingSize: '20px',
      })

      const processedSpeakers = await Promise.all(
        values.speakers.map(async (speaker: any) => {
          let imageBase64 = speaker.image // Start by assuming the image is already valid

          // Check if it's a File object or already a Base64/Cloudinary URL
          if (speaker.image && speaker.image[0] instanceof File) {
            // If it's a File, convert to Base64
            const base64Image = await convertFileToBase64(speaker.image[0])
            imageBase64 = base64Image as any
          } else if (
            typeof speaker.image === 'string' &&
            !speaker.image.startsWith('data:') &&
            !speaker.image.includes('cloudinary')
          ) {
            // Handle non-Base64 or non-Cloudinary URLs if necessary
            throw new Error(
              'Invalid image format. Only base64 or Cloudinary URLs are allowed.'
            )
          }

          return {
            name: speaker.name,
            bio: speaker.bio,
            image: imageBase64, // Either the converted Base64 or the existing value
          }
        })
      )

      const updatedEvent = {
        ...values,
        speakers: processedSpeakers,
      }

      await updateEvent(event.id, updatedEvent)
      router.push(`${DEFAULT_URL}/admin/events`)
      setSuccess('Event updated successfully!')
    } catch (error) {
      console.error('Error during form submission:', error)
      setError('Failed to update event')
    }

    hideLoading({ timeLoading: 1500 })
  }

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  )

  return (
    <>
      <TitlePage>Edit Event</TitlePage>
      {error && <div className="text-red-500">{error}</div>}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 gap-5"
      >
        <div className="bg-white rounded-md w-full">
          <div className="p-5 flex flex-col justify-between space-y-6">
            <Form {...form}>
              <FormField
                name="title"
                render={({ field }) => (
                  <FormItem className="max-w-96">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" maxLength={256} {...field} />
                    </FormControl>
                    <FormDescription>Event Title</FormDescription>
                  </FormItem>
                )}
              />

              {/* Image */}
              <div className="p-2">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <FormItem className="flex flex-col max-w-64">
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Button size="lg" type="button">
                            <input
                              type="file"
                              id="fileInput"
                              className="text-white"
                              onBlur={field.onBlur}
                              name={field.name}
                              onChange={(e) => field.onChange(e.target.files)}
                              ref={field.ref}
                            />
                          </Button>
                        </FormControl>
                        <FormDescription>
                          2mb max, PNG, JPG, JPEG, WEBP
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>

              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem className="max-w-96">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <ReactQuill
                        placeholder="Description de event"
                        theme="snow"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Event Description</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start and End Date</FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value.from && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, 'LLL dd, y')} -{' '}
                                {format(field.value.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(field.value.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          mode="range"
                          defaultMonth={field.value.from as Date}
                          selected={{
                            from: field.value.from! as Date,
                            to: field.value.to as Date,
                          }}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the start and end date
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="max-w-52">
                <FormField
                  name="enrollDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enroll Deadline</FormLabel>
                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Enroll Deadline de Event.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Event location" {...field} />
                    </FormControl>
                    <FormDescription>Event Location</FormDescription>
                  </FormItem>
                )}
              />

              {/* Additional fields like Capacity, Price, etc. */}
              <SpeakerFieldArray />
            </Form>
          </div>
          <Button className="m-5 text-white" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </>
  )
}
