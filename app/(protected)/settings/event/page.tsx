'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Pencil, Trash2 } from 'lucide-react'
import { Navbar } from '../../_components/navbar'
import { Event } from '@prisma/client'
import { useEventsManager } from '@/hooks/use-event'
import moment from 'moment'

export default function Page() {
  const { data: initialEvents } = useEventsManager() as { data: Event[] }

  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    setEvents(initialEvents)
  }, [initialEvents])

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
                  <TableCell>
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

function EditEventForm({
  event,
  onSave,
}: {
  event: Event | null
  onSave: (event: Event) => void
}) {
  const [editedEvent, setEditedEvent] = useState<Event>(event as Event)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedEvent)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          name="name"
          value={editedEvent.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        {/* <Input
          id="date"
          name="date"
          type="date"
          value={editedEvent.date}
          onChange={handleChange}
          required
        /> */}
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={editedEvent.location}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}
