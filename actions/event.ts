import { currentRole, currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { EventSchema } from '@/schemas'
import { z } from 'zod'

export const create = async (values: z.infer<typeof EventSchema>) => {
  const user = await currentUser()

  if (!user?.id) {
    return { error: 'User not authenticated!' }
  }

  const validatedFields = EventSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  await db.event.create({
    data: {
      ...validatedFields.data,
      userId: user.id,
    },
  })

  return { success: 'Event Created successfully!' }
}

export const update = async (
  values: z.infer<typeof EventSchema> & { id: string }
) => {
  const user = await currentUser()

  const validatedFields = EventSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  await db.event.update({
    where: { id: values.id, userId: user?.id },
    data: validatedFields.data,
  })

  return { success: 'Event Updated successfully!' }
}

export const remove = async (id: string) => {
  await db.event.delete({
    where: { id },
  })

  return { success: 'Event Deleted successfully!' }
}

export const getEventClient = async (id: string) => {
  return await db.event.findUnique({
    where: { id },
    select: {
      //DONT SELECT SENSITIVE DATA Payments Attendees
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      enrollDeadline: true,
      location: true,
      image: true,
      isPaid: true,
      price: true,
      capacity: true,
    },
  })
}

export const getEventsClient = async () => {
  return await db.event.findMany({
    select: {
      //DONT SELECT SENSITIVE DATA Payments Attendees
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      enrollDeadline: true,
      location: true,
      image: true,
      isPaid: true,
      price: true,
      capacity: true,
    },
  })
}

export const getEventAdmin = async (id: string) => {
  return await db.event.findUnique({
    where: { id },
    include: {
      payments: true,
      attendees: true,
    },
  })
}

export const getEventsAdmin = async () => {
  return await db.event.findMany({
    include: {
      payments: true,
      attendees: true,
    },
  })
}

export const enroll = async (
  eventId: string,
  paymentType: 'CASH' | 'CHARGILY'
) => {
  const user = await currentUser()

  if (!user?.id) {
    return { error: 'User not authenticated!' }
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
    select: { id: true, capacity: true, attendees: true, enrollDeadline: true },
  })

  if (!event) {
    return { error: 'Event not found!' }
  }

  const attendee = await db.attendee.findFirst({
    where: { eventId, userId: user.id },
  })

  if (attendee) {
    return { error: 'Already enrolled!' }
  }

  if (event?.capacity === 0 || event?.capacity === null) {
    return { error: 'Event is full!' }
  }

  if (event?.attendees.length >= event?.capacity) {
    return { error: 'Event is full!' }
  }

  if (event?.enrollDeadline && new Date() > event?.enrollDeadline) {
    return { error: 'Enroll deadline haspassed!' }
  }

  if (paymentType === 'CHARGILY') {
    //CHARGILY PAYMENT
  }

  if (paymentType === 'CASH') {
    //CASH PAYMENT

    const Payment = await db.payment.create({
      data: {
        eventId,
        userId: user.id,
        paidAt: new Date(),
        amount: 0,
        type: 'CASH',
      },
    })

    const Attendee = await db.attendee.create({
      data: {
        eventId,
        userId: user.id,
        enrolledAt: new Date(),
        paid: false,
        paymentId: Payment.id,
      },
    })

    await db.payment.update({
      where: { id: Payment.id },
      data: { attendee: { connect: { id: Attendee.id } } },
    })
  }

  return { success: 'Enrolled successfully!' }
}
