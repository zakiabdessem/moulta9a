import { create } from '@/actions/event'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const event = await create(data)

    return new NextResponse(JSON.stringify(event), { status: 200 })
  } catch (error) {
    console.error('🚀 ~ POST ~ error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Blog creation failed' }),
      { status: 500 }
    )
  }
}
