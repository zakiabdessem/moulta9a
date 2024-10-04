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
import { Textarea } from '@/components/ui/textarea'
import { BlogSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DEFAULT_URL } from '@/routes'
import { useRouter } from 'next/navigation'
import { useCreateBlog } from '@/hooks/use-blog'

function page() {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: '',
      image: '',
      content: '',
    },
  })

  //check form erros with useEffect
  // useEffect(() => {
  //   console.log(
  //     '🚀 ~ file: page.tsx ~ line 52 ~ useEffect ~ form.formState.errors',
  //     form.formState.errors
  //   )
  //   if (form.formState.errors) {
  //     setError('Please check the form for errors')
  //   }
  // }, [form.formState.errors])

  const onSubmit = async (values: any) => {
    try {
      showLoading({
        message: 'Loading...',
        spinnerColor: '#f3752b',
        textLoadingColor: '#EE5E09',
        textLoadingSize: '20px',
      })
      await useCreateBlog(values)
      router.push(`${DEFAULT_URL}/admin/blogs`)
      setSuccess('Blog created successfully!')
    } catch (error) {
      console.error('Error during form submission:', error)
      setError('Failed to create blog')
    }

    hideLoading({ timeLoading: 1500 })
  }

  return (
    <>
      <TitlePage>Create Blog</TitlePage>
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
                        placeholder="Titre de Blog"
                        maxLength={256}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Titre de Blog.</FormDescription>
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
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Content de blog"
                          maxLength={1024}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Description de blog.</FormDescription>
                    </FormItem>
                  )}
                />
              </div>

            </Form>
          </div>
          <Button className="m-5 text-white" type="submit">
            Create Blog
          </Button>
        </div>
      </form>
    </>
  )
}

export default page
