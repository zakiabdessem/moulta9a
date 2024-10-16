import { getUpcomingEvents } from "@/actions/event"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await getUpcomingEvents()
    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('Error in fetching upcoming events:', error)
    return new NextResponse(null, { status: 500 })
  }
}
