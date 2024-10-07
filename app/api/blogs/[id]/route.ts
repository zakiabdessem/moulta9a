import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

// GET single route
export async function GET(req: NextApiRequest) {
  //read param
  const { id } = req.query;

  

  return new NextResponse(JSON.stringify({ message: 'GET /api/blogs/[id]' }), {
    status: 200,
  })
}
