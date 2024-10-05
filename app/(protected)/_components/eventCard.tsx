import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import EventImage from '@/public/event-image.png'
import Speaker from '@/public/speaker.jpg'
import { Event } from '@prisma/client'

export default function EventCard({
  event,
}: {
  event: Event & {
    user: {
      name: string
      image: string
    }
  }
}) {
  const date = new Date(event.createdAt)
  return (
    <div
      key={event.id}
      className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8 cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="relative">
          <Image
            alt="Event header image"
            className="h-64 w-full object-cover object-center"
            height="256"
            src={event.image}
            style={{
              aspectRatio: '768/256',
              objectFit: 'cover',
            }}
            width="768"
          />
          <Badge
            className="absolute left-4 top-4 bg-gray-900 text-white"
            variant="secondary"
          >
            offline
          </Badge>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-4 flex justify-between items-center gap-2">
              <Image
                alt="Author avatar"
                className="h-12 w-12 rounded-full"
                height="40"
                src={Speaker}
                style={{
                  aspectRatio: '40/40',
                  objectFit: 'cover',
                }}
                width="40"
              />
              <div>
                <p className="text-sm font-medium">{event.user.name}</p>
                <p className="text-xs text-gray-500">April 18th, 2023</p>
              </div>
              <Badge className="ml-auto" variant="secondary">
                SOON
              </Badge>
            </div>
            <h2 className="mb-2 text-2xl font-bold">{event.title}</h2>
            <p className="mb-4 text-gray-600">{event.description}</p>
            <Button
              className="bg-[#b5a28c] text-white hover:bg-[#a3917c] mt-4"
              variant="secondary"
            >
              Join Now
            </Button>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 max-md:hidden">
            <div className="mb-4 text-center">
              <Image
                alt="Speaker profile"
                className="mx-auto h-20 w-20 rounded-full"
                height="80"
                src={Speaker}
                style={{
                  aspectRatio: '80/80',
                  objectFit: 'cover',
                }}
                width="80"
              />
              <h3 className="mt-2 text-lg font-semibold">Abdelhakim Farah</h3>
              <p className="text-sm text-gray-500">Speaker</p>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
