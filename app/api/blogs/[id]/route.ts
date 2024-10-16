import { getBlogClient, remove } from '@/actions/blog'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    const event = await getBlogClient(id)
    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }
}
