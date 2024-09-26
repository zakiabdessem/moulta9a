import { getEventsAdmin } from '@/actions/event'
import { currentRole } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const role = await currentRole()
    //   console.log("🚀 ~ GET ~ role:", role)

    if (role !== 'ADMIN') {
      return new NextResponse(null, { status: 403 })
    }

    const data = await getEventsAdmin()
    console.log('🚀 ~ GET ~ data:', data)

    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('🚀 ~ GET ~ error:', error)
    return new NextResponse(null, { status: 500 })
  }
}
