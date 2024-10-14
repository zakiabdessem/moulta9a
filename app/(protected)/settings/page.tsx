'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsSchema } from '@/schemas'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'

import { settings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Navbar } from '../_components/navbar'
import { convertFileToBase64 } from '@/util/Image'

const SettingsPage = () => {
  const user = useCurrentUser()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: `${user?.name}` || undefined,
      email: `${user?.email}` || undefined,
      password: undefined,
      newPassword: undefined,
      image: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    // Convert image file to Base64
    if (values.image && values.image[0]) {
      const base64Image = await convertFileToBase64(values.image[0])
      values.image = base64Image
    }

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch((e) => {
          setError('Something went wrong!')
        })
    })
  }

  return (
    <main className=" flex flex-col justify-center items-center">
      <Navbar />
      <Card className="mt-12">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          disabled={isPending}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="on"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0560761044"
                          disabled={isPending}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="on"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
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
                                  onChange={(e) =>
                                    field.onChange(e.target.files)
                                  }
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
                  </>
                )}

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              placeholder="•••••••••"
                              disabled={isPending}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="on"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              placeholder="•••••••••"
                              disabled={isPending}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="on"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Two Factor Authentication</FormLabel>
                            <FormDescription>
                              Enable 2FA for your Account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Two Factor Authentication</FormLabel>
                            <FormDescription>
                              Enable 2FA for your Account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                className="w-full text-white"
                size="lg"
                type="submit"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default SettingsPage
