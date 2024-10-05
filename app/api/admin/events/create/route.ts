import { create } from '@/actions/event'; // Assuming you have a create function to handle event creation
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Pass the event data to your create function (make sure it handles the Base64 image)
    const event = await create(data);

    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.error('🚀 ~ POST ~ error:', error);
    return new NextResponse(JSON.stringify({ error: 'Event creation failed' }), { status: 500 });
  }
}
