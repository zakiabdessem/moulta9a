import { getEventClient } from '@/actions/event'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { parse } from 'path'

// GET single route
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    const event = await getEventClient(id)
    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }
}
