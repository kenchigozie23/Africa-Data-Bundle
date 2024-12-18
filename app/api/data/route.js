// app/api/data/route.js
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = 'sk_live_1f989bb4583225682fbea8c586d81281ef51e9b6';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Initialize Paystack transaction for data purchase
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: body.email,
        amount: parseInt(body.amount) * 100, // Convert to kobo/pesewas
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/data/verify`,
        metadata: {
          custom_fields: [
            {
              receiver: body.Receiver,
              package_type: body.Package_Type,
              data_plan: body.data_plan,
              reference: body.Reference
            }
          ]
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Payment initialization failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}