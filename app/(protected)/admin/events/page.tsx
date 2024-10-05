import { admin } from '@/actions/admin'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAdminEvents } from '@/hooks/use-event'
import { DEFAULT_URL } from '@/routes'
import { CheckboxIcon } from '@radix-ui/react-icons'
import { DeleteIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import moment from 'moment'
import { Event } from '@prisma/client'

export default async function Page() {
  const events =  (await admin()) ? await useAdminEvents() : []

  return (
    <div className="bg-white rounded-md">
      <div className="flex max-sm:flex-col justify-between p-2">
        <a href={`${DEFAULT_URL}/admin/events/create`}>
          <Button className="text-white">
            <PlusIcon className="mr-2" width={16} height={16} />
            Create Event
          </Button>
        </a>
      </div>
      <div className="bg-white rounded-md">
        {events && events.length > 0 && <ProductTable events={events || []} />}
      </div>
    </div>
  )
}

function ProductTable({ events }: { events: Event[] }) {
  //   const navigate = useNavigate()

  const handleDeleteAnnounce = async (id: string) => {
    // await instance
    //   .post('blog/delete', {
    //     id,
    //   })
    //   .then(() => {
    //     toast.success(`Blog is deleted`, {
    //       position: 'bottom-right',
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     })
    //     setTimeout(() => {
    //       navigate(`${MAIN_DASHBOARD_URL}/blogs`)
    //     }, 1000)
    //   })
  }

  return (
    <Table>
      <TableCaption className="p-2">
        A table for all of your blogs.
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-[50px]"></TableHead>

          <TableHead>CreatedAt</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Image</TableHead>

          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events &&
          events.length > 0 &&
          events.map((event) => {
            const date = moment(event.dateRangeFrom.toString()).format('LLL')
            return (
              <TableRow key={event.id}>
                <TableCell className="max-h-16 max-w-16">
                  <CheckboxIcon />
                </TableCell>
                <TableCell className="font-medium text-gray-400">
                  {date}
                </TableCell>
                <TableCell className="max-h-16 max-w-16 font-medium">
                  {event.title.toUpperCase()}
                </TableCell>
                <TableCell className="max-h-16 max-w-16">
                  <img
                    src={event.image}
                    alt={event.id + 'Image'}
                    className="w-48 h-32"
                  />
                </TableCell>
                <TableCell className="max-h-16 max-w-16">{event.isPaid && "Paid Event"}</TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
