import { create } from '@/actions/blog'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    //console.log('🚀 ~ POST ~ data received:', data)

    const blog = await create(data)

    return new NextResponse(JSON.stringify(blog), { status: 200 })
  } catch (error) {
    console.error('🚀 ~ POST ~ error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Blog creation failed' }),
      { status: 500 }
    )
  }
}
