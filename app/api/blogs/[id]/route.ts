import { remove } from '@/actions/blog';
import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'

// GET single route
export async function GET(req: NextApiRequest) {
  //read param
  const { id } = req.query;

  

  return new NextResponse(JSON.stringify({ message: 'GET /api/blogs/[id]' }), {
    status: 200,
  })
}


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
