import { create } from '@/actions/event'
import { update } from '@/actions/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data: {
      role: string
      userId: string
    } = await req.json()
    await update(
      {
        role: data.role,
      },
      data.userId
    )

    return new NextResponse('Updated Role Successfully', { status: 200 })
  } catch (error) {
    console.error('🚀 ~ POST ~ error:', error)
    return new NextResponse(JSON.stringify({ error: 'Blog creation failed' }), {
      status: 500,
    })
  }
}
