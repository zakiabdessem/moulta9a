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
import { cn } from '@/lib/utils'
import { EventSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { createEvent } from '@/hooks/use-event'
import { Calendar } from '@/components/ui/calendar'
import { DEFAULT_URL } from '@/routes'
import { useRouter } from 'next/navigation'
import SpeakerFieldArray from '@/app/(protected)/_components/SpeakerField'
import { convertFileToBase64 } from '@/util/Image'
import dynamic from 'next/dynamic'

function Page() {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  )

  const router = useRouter()

  const [error, setError] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      enrollDeadline: new Date(),
      location: '',
      isPaid: false,
      capacity: 1,
      price: 0,
      speakers: [],
    },
  })

  //check form erros with useEffect
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
          let imageBase64 = ''
          if (speaker.image && speaker.image[0]) {
            // Convert image file to Base64
            const base64Image = await convertFileToBase64(speaker.image[0])

            imageBase64 = base64Image as any
          }

          return {
            name: speaker.name,
            bio: speaker.bio,
            image: imageBase64, // Use the uploaded image URL
          }
        })
      )

      const eventData = {
        ...values,
        speakers: processedSpeakers, // Include processed speakers with image URLs
      }

      await createEvent(eventData)
      router.push(`${DEFAULT_URL}/admin/events`)
      setSuccess('Event created successfully!')
    } catch (error) {
      console.error('Error during form submission:', error)
      setError('Failed to create event')
    }

    hideLoading({ timeLoading: 1500 })
  }

  return (
    <>
      <TitlePage>Create Event</TitlePage>
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
                      <Input
                        placeholder="Titre de event"
                        maxLength={256}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Titre de Event.</FormDescription>
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
                        <FormLabel>Image*</FormLabel>
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

              <div className="max-w-96">
                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <ReactQuill
                          placeholder="Description de event"
                          theme="snow"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Description de Event.</FormDescription>
                    </FormItem>
                  )}
                />
              </div>

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
                          numberOfMonths={1}
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

              <div className="max-w-80">
                <FormField
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Location de event" {...field} />
                      </FormControl>
                      <FormDescription>Location de Event.</FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="isPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Paid</FormLabel>
                    <FormControl>
                      <Input className="size-6" type="checkbox" {...field} />
                    </FormControl>
                    <FormDescription>Is Paid de Event.</FormDescription>
                  </FormItem>
                )}
              />

              <div className="max-w-40">
                {form.watch('isPaid') && (
                  <FormField
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Price de Event par personne.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="max-w-40">
                <FormField
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Capacity de Event.</FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <SpeakerFieldArray />
            </Form>
          </div>
          <Button className="m-5 text-white" type="submit">
            Create Event
          </Button>
        </div>
      </form>
    </>
  )
}

export default Page
