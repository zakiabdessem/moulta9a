import { getUsersAdmin } from '@/actions/user'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await getUsersAdmin()

    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('🚀 ~ GET ~ error:', error)
    return new NextResponse(null, { status: 500 })
  }
}
