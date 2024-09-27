import * as z from 'zod'

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(1)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(1, {
        message: 'The current password is needed to reset the password',
      })
    ),
    newPassword: z.optional(
      z
        .string()
        .min(8, {
          message: 'Password must be at least 8 characters',
        })
        .regex(
          new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}'),
          {
            message:
              'Password must contain one uppercase letter, one lowercase letter, one number and one of the following characters: * . ! @ $ % &',
          }
        )
    ),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Password is required!',
      path: ['password'],
    }
  )

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .regex(
      new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}'),
      {
        message:
          'Password must contain one uppercase letter, one lowercase letter, one number and one of the following characters: * . ! @ $ % &',
      }
    ),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(
    z
      .string()
      .min(1, { message: 'Code is required' })
      .max(6, { message: 'Code cannot be longer than six chracters' })
  ),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .regex(
      new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}'),
      {
        message:
          'Password must contain one uppercase letter, one lowercase letter, one number and one of the following characters: * . ! @ $ % &',
      }
    ),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
})

export const EventSchema = z
  .object({
    dateRange: z
      .object(
        {
          from: z.date(),
          to: z.date(),
        },
        {
          required_error: 'Please select a date range',
        }
      )
      .refine((data) => data.from < data.to, {
        path: ['dateRange'],
        message: 'From date must be before to date',
      }),
    title: z.string().min(1, {
      message: 'Title is required',
    }),
    description: z.string().min(1, {
      message: 'Description is required',
    }),
    enrollDeadline: z.date(),
    location: z.string().min(1, {
      message: 'Location is required',
    }),
    image: z.any(),
    isPaid: z.boolean(),
    price: z.number().min(0, {
      message: 'Price is required',
    }),
    capacity: z.coerce.number().min(1, {
      message: 'Capacity is required',
    }),
  })
  
  .refine((data) => {
    if (data.dateRange.from >= data.enrollDeadline) {
      return false
    }

    return true
  }, 'Enroll deadline must be after start date')
