import PasswordResetEmail from '@/emails/password-reset'
import TwoFactorEmail from '@/emails/two-factor'
import VerificationEmail from '@/emails/verification'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '[🔐Auth]: Condirm your Account.',
    react: PasswordResetEmail({
      resetPasswordLink: confirmLink,
      name: name,
    }),
  })
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const resetPasswordLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '[🔐Auth]: Reset you password.',
    react: PasswordResetEmail({
      resetPasswordLink: resetPasswordLink,
      name: name,
    }),
  })
}

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
  name: string
) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '[🔐Auth]: Please verify Login Attempt.',
    react: TwoFactorEmail({ token, name }),
  })
}
