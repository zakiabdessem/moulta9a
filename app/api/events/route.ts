import { getEventsClient } from '@/actions/event'
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const data = await getEventsClient()

    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('🚀 ~ GET ~ error:', error)
    return new NextResponse(null, { status: 500 })
  }
}
