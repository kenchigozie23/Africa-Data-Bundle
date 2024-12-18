// app/api/payment/route.js
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = 'sk_live_b0c2c918f16461c840014a8febea59346071c7d8'; // Replace with your actual secret key

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Initialize Paystack transaction
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: body.email,
        amount: parseInt(body.Volume) * 100, // Convert to kobo/pesewas
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/verify`,
        metadata: {
          custom_fields: [
            {
              receiver: body.Receiver,
              package_type: body.Package_Type,
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