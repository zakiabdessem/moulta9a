import crypto from 'crypto'
import { NextResponse, NextRequest } from 'next/server'

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle raw body
  },
}

export async function POST(req: NextRequest) {
  try {
    // Get the raw body
    const rawBody = req.body as any

    // Parse the body as JSON
    const body = JSON.parse(rawBody.toString('utf8'))

    // Get the signature from headers
    const signature = req.headers.get('signature')

    if (!signature) {
      return NextResponse.json(
        { message: 'Missing signature' },
        { status: 400 }
      )
    }

    if (!rawBody) {
      return NextResponse.json({ message: 'Missing raw body' }, { status: 400 })
    }

    if (!process.env.CHARGILY_API) {
      return NextResponse.json(
        { message: 'Missing CHARGILY_API' },
        { status: 400 }
      )
    }

    // Compute the HMAC signature
    const computedSignature = crypto
      .createHmac('sha256', process.env.CHARGILY_API)
      .update(rawBody)
      .digest('hex')

    if (computedSignature !== signature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 403 }
      )
    }

    // Handle the different webhook events
    switch (body.type) {
      case 'checkout.paid':
        const checkout = body.data
        // Call your order service logic here (mocked for illustration)
        await updateOrderStatusByCheckoutId(checkout.id, 'confirmed')
        break
      case 'checkout.failed':
        const failedCheckout = body.data
        await updateOrderStatusByCheckoutId(failedCheckout.id, 'canceled')
        break
      default:
        return NextResponse.json(
          { message: 'Unknown event type' },
          { status: 400 }
        )
    }

    return NextResponse.json(
      { message: 'Webhook processed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse(null, { status: 500 })
  }
}

// Mocked service function for updating order status
async function updateOrderStatusByCheckoutId(
  checkoutId: string,
  status: string
) {
  console.log(`Updating order ${checkoutId} to status ${status}`)
}
