import { currentRole, currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { EventSchema } from '@/schemas'
import { z } from 'zod'
import { ChargilyClient } from '@chargily/chargily-pay'
import { uploadImage } from './cloudinary'
import { isUrl } from '@/util/Image'

const client = new ChargilyClient({
  api_key: process.env.CHARGILY_API || '',
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'test',
})

export const create = async (values: z.infer<typeof EventSchema>) => {
  const user = await currentUser()
  console.log('🚀 ~ create ~ user:', user)
  if (!user?.id) {
    return { error: 'User not authenticated!' }
  }

  if (!(user?.role == 'ADMIN' || user?.role == 'MANAGER')) {
    return { error: 'User not authorized!' }
  }

  const validatedFields = EventSchema.safeParse(values)

  if (!validatedFields.success) {
    console.log('🚀 ~ create ~ validatedFields: ', validatedFields.error)
    return { error: 'Invalid fields!' }
  }

  const { dateRange, speakers, ...restValues } = values

  // Create the event
  const { id: eventId } = await db.event.create({
    data: {
      ...restValues,
      userId: user.id,
      image: isUrl(values.image)
        ? values.image
        : await uploadImage(values.image), // Upload event image
      dateRangeFrom: dateRange.from,
      dateRangeTo: dateRange.to,
    },
  })
  console.log('🚀 ~ create ~ eventId:', eventId)

  // Handle speakers asynchronously using Promise.all
  const speakerPromises = speakers.map(async (speaker) => {
    // Upload the image for each speaker
    const uploadedImage = isUrl(speaker.image)
      ? speaker.image
      : await uploadImage(speaker.image)

    // Create the speaker and link it to the event
    const { id: speakerId } = await db.speaker.create({
      data: {
        ...speaker,
        image: uploadedImage, // Ensure image is always provided
        event: {
          connect: { id: eventId }, // Link speaker to event
        },
      },
    })

    // Return each speaker ID (for debugging or future use)
    return speakerId
  })

  // Wait for all speaker creations to complete
  await Promise.all(speakerPromises)

  // No need to update the event, speakers are already connected during creation
  return { success: 'Event Created successfully!' }
}

export const getEventsManager = async () => {
  const user = await currentUser()

  if (!user?.id) {
    return { error: 'User not authenticated!' }
  }

  const events = await db.event.findMany({
    where: { userId: user?.id },
    include: {
      speakers: true,
    },
  })

  return events
}

export const update = async (
  values: z.infer<typeof EventSchema> & { id: string },
  id: string
) => {
  const validatedFields = EventSchema.safeParse(values)

  if (!validatedFields.success) {
    //console.log('🚀 ~ update ~ validatedFields: ', validatedFields.error)
    return { error: 'Invalid fields!' }
  }

  try {
    await db.event.update({
      where: { id },
      data: {
        description: values.description,
        title: values.title,
        location: values.location,
        image: isUrl(values.image)
          ? values.image
          : await uploadImage(values.image),
        dateRangeFrom: values.dateRange.from,
        dateRangeTo: values.dateRange.to,
        enrollDeadline: values.enrollDeadline,
        speakers: {
          update: values.speakers.map((speaker) => ({
            where: { id: speaker.id },
            data: speaker,
          })),
        },
      },
    })
  } catch (error) {
    console.log('🚀 ~ update ~ error:', error)
  }

  return { success: 'Event Updated successfully!' }
}

export const remove = async (id: string) => {
  try {
    // Delete associated speakers first
    await db.speaker.deleteMany({
      where: { eventId: id }, // Assuming 'eventId' is the foreign key in the speakers table
    })

    await db.attendee.deleteMany({
      where: { eventId: id }, // Assuming 'eventId' is the foreign key in the speakers table
    })

    await db.payment.deleteMany({
      where: { eventId: id }, // Assuming 'eventId' is the foreign key in the speakers table
    })

    // Now delete the event
    await db.event.delete({
      where: { id },
    })

    return { success: 'Event Deleted successfully!' }
  } catch (error) {
    console.log('🚀 ~ remove ~ error:', error)
    throw new Error('Failed to delete the event')
  }
}

export const getEventClient = async (id: string) => {
  return await db.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      dateRangeFrom: true,
      dateRangeTo: true,
      enrollDeadline: true,
      location: true,
      image: true,
      isPaid: true,
      price: true,
      capacity: true,
      user: true,
      speakers: true,
    },
  })
}

export const getEventsClient = async () => {
  return await db.event.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      dateRangeFrom: true,
      dateRangeTo: true,
      enrollDeadline: true,
      location: true,
      image: true,
      isPaid: true,
      price: true,
      capacity: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      speakers: true,
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
    throw new Error('User not authenticated!')
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
    select: {
      id: true,
      title: true,
      description: true,
      capacity: true,
      price: true,
      attendees: true,
      enrollDeadline: true,
    },
  })

  if (!event) {
    throw new Error('Event not found!')
  }

  const attendee = await db.attendee.findFirst({
    where: { eventId, userId: user.id },
  })

  if (attendee) {
    throw new Error('Already enrolled!')
  }

  if (event?.capacity === 0 || event?.capacity === null) {
    throw new Error('Event is full!')
  }

  if (event?.attendees.length >= event?.capacity) {
    throw new Error('Event is full!')
  }

  if (event?.enrollDeadline && new Date() > event?.enrollDeadline) {
    throw new Error('Enroll deadline has passed!')
  }

  if (paymentType === 'CHARGILY') {
    //CHARGILY PAYMENT
    const User = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        adress: true,
        city: true,
      },
    })

    if (!User) {
      throw new Error('User not found!')
    }

    await client.createCustomer({
      name: User.name || 'John Doe',
      email: User.email || '[email protected]',
      phone: User.phone || '213555555555',
      address: {
        country: 'DZ',
        state: User.city || 'Algiers',
        address: User.adress || '123 Main Street',
      },
      metadata: {
        notes: 'Note Included in the admin dashboard',
      },
    })

    const Product = await client.createProduct({
      name: event.title,
      description: event.description ?? 'No Descp',
      metadata: {
        category: 'Library items',
      },
    })

    await db.payment.create({
      data: {
        eventId,
        userId: user.id,
        paid: false,
        amount: event.price,
        type: 'CHARGILY',
      },
    })

    const Price = await client.createPrice({
      amount: event.price,
      currency: 'dzd',
      product_id: Product.id,
    })

    const { checkout_url } = await client.createCheckout({
      items: [
        {
          price: Price.id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      failure_url: process.env.NEXT_PUBLIC_APP_URL,
    })

    return { checkout_url }
  }

  if (paymentType === 'CASH') {
    //CASH PAYMENT

    const Payment = await db.payment.create({
      data: {
        eventId,
        userId: user.id,
        paid: false,
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

export const getEventAttendees = async (eventId: string) => {
  return await db.attendee.findMany({
    where: { eventId },
    include: {
      user: true,
    },
  })
}
