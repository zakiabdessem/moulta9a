import { getEventClient, remove, update } from '@/actions/event'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic";

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

//POST

// PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const body = await req.json()

  try {
    const event = await update(body, id)
    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    await remove(id)
    return NextResponse.json({ message: 'Event deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }
}
