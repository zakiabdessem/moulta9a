import { enroll, getEventAttendees } from '@/actions/event'
import { NextRequest, NextResponse } from 'next/server'

// GET single route
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    try {
        const attendees = await getEventAttendees(id)
        return NextResponse.json(attendees, { status: 200 })
    } catch (error) {
        console.log('Error :', error)

        return NextResponse.json(
            { error: (error as Error).message },
            { status: 404 }
        )
    }
}
