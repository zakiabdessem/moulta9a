'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Rows3, Trash2 } from 'lucide-react'
import { Navbar } from '../../_components/navbar'
import { Attendee, Event, User } from '@prisma/client'
import { useEventAttendee, useEventsManager } from '@/hooks/use-event'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function Page() {
  const [attendees, setAttendees] = useState<(Attendee & { user: User })[]>([])
  const { data: initialEvents } = useEventsManager() as { data: Event[] }
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Track dialog open state

  const handleFetchAttendees = async (id: string) => {
    try {
      const data = await useEventAttendee(id)
      console.log('🚀 ~ handleFetchAttendees ~ data:', data)
      setAttendees(data) // Update attendees state with fetched data
      setIsDialogOpen(true) // Open dialog after data is fetched
    } catch (error) {
      console.error('Failed to fetch attendees:', error)
    }
  }

  useEffect(() => {
    setEvents(initialEvents)
  }, [initialEvents])

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ attendees:', attendees)
  }, [attendees])

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="text-2xl font-bold mb-5">Event Manager</h1>
      <Table className="p-12">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date From - To</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events &&
            Array.isArray(events) &&
            events.length > 0 &&
            events?.map((event) => {
              const date = moment(event.dateRangeFrom.toString()).format('LLL')
              return (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{event.location}</TableCell>

                  <TableCell className="flex space-x-2 items-center">
                    <Button onClick={() => handleFetchAttendees(event.id)}>
                      <Rows3 className="h-4 w-4" />
                    </Button>

                    {/* Render Dialog Only if isDialogOpen is true */}
                    {isDialogOpen && (
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogContent className="min-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Attendees List</DialogTitle>
                            <DialogDescription>
                              <div className="rounded-md border">
                                <Table>
                                  <TableCaption>Attendees List</TableCaption>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[270px]">
                                        Full Name
                                      </TableHead>
                                      <TableHead>Email</TableHead>
                                      <TableHead>Phone</TableHead>
                                      <TableHead className="text-right w-[270px]">
                                        Registered At
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {attendees?.length > 0 ? (
                                      attendees?.map(
                                        (
                                          attendee: Attendee & { user: User }
                                        ) => {
                                          const date = moment(
                                            attendee.createdAt
                                          ).format('LLL')
                                          return (
                                            <TableRow key={attendee.id}>
                                              <TableCell className="font-medium">
                                                {attendee.user.name}
                                              </TableCell>
                                              <TableCell>
                                                {attendee.user.email}
                                              </TableCell>
                                              <TableCell>
                                                {attendee.user.phone || 'N/A'}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                {date}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        }
                                      )
                                    ) : (
                                      <TableRow>
                                        <TableCell
                                          colSpan={4}
                                          className="text-center"
                                        >
                                          No attendees found.
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}

                    <div className="flex space-x-2">
                      <a href={`/settings/event/delete/${event.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
