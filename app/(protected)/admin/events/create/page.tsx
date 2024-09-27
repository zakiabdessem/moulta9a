'use client'
import { TitlePage } from '@/app/(protected)/_components/PageTitle'
import { Button } from '@/components/ui/button'
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
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { useCreateEvent } from '@/hooks/use-event'

function page() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const { mutateAsync } = useCreateEvent()

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
    },
  })

  // const onSubmit = async (values: any) => {
  //   const errors = form.getValues()
  //   console.log(errors)

  //   setError('')
  //   setSuccess('')

  //   let fileImage: File = values.image[0] // Ensure this is a File object

  //   // Convert File to base64 string using FileReader and Promise
  //   try {
  //     values.image = await new Promise((resolve, reject) => {
  //       let reader = new FileReader()

  //       reader.onload = function (event) {
  //         const result = event?.target?.result
  //         if (typeof result === 'string') {
  //           resolve(result) // Resolve with base64 string
  //         } else {
  //           reject(new Error('Failed to convert file to base64 string'))
  //         }
  //       }

  //       reader.onerror = function () {
  //         reject(new Error('Failed to read file'))
  //       }

  //       reader.readAsDataURL(fileImage) // Read file as base64
  //     })
  //   } catch (error) {
  //     setError('Error converting image')
  //     return
  //   }

  //   startTransition(() => {
  //     create(values)
  //       .then((data) => {
  //         setError(data.error || '')
  //         setSuccess(data.success || '')
  //       })
  //       .catch((error) => {
  //         setError('Error creating event')
  //       })
  //   })

  //   form.reset() // Reset form
  // }

  const onSubmit = async (values: any) => {
    console.log('Before Form submitted', values)

    mutateAsync(values)

    console.log('Form submitted', values)
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
                        <Textarea
                          placeholder="Description de event"
                          maxLength={1024}
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
                          initialFocus
                          mode="range"
                          defaultMonth={field.value.from}
                          selected={{
                            from: field.value.from!,
                            to: field.value.to,
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

export default page
