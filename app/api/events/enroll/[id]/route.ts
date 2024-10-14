import { enroll } from '@/actions/event'
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'path'

// GET single route
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const payload = await req.json()
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  try {
    const event = await enroll(id, payload.payment_type)
    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.log('Error :', error)

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 }
    )
  }
}
