'use client'
import { create } from '@/actions/event'
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
import { EventSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function page() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
  })

  const onSubmit = (values: z.infer<typeof EventSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      create(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })

    form.reset
  }

  return (
    <>
      <TitlePage>Create Event</TitlePage>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-lg:flex-col gap-2"
      >
        <div className="bg-white rounded-md w-full">
          <div className="p-5 flex flex-col justify-between">
            <Form {...form}>
              <FormField
                name="title"
                render={({ field }) => (
                  <FormItem className="max-w-72">
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
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description de event"
                        maxLength={1024}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Description de Event.</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Date de Event.</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>End Date de Event.</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="enrollDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enroll Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Enroll Deadline de Event.</FormDescription>
                  </FormItem>
                )}
              />

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

              {form.watch('isPaid') && (
                <FormField
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Price de Event.</FormDescription>
                    </FormItem>
                  )}
                />
              )}
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
