// app/api/topup/route.js
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = 'sk_live_1f989bb4583225682fbea8c586d81281ef51e9b6';
const VALUE4MONI_API_KEY = 'e798052c-8853-41f6-8eee-4908d367258b';
const VALUE4MONI_API_URL = 'https://www.value4moni.com/api/v1/inititate_transaction';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.amount || !body.Receiver || !body.Package_Type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount
    const amount = parseFloat(body.amount);
    if (isNaN(amount) || amount < 1 || amount > 1000) {
      return NextResponse.json(
        { message: 'Invalid amount. Must be between GHS 1 and GHS 1,000' },
        { status: 400 }
      );
    }

    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: body.email,
        amount: Math.round(amount * 100), // Convert to pesewas
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/topup/verify`,
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

    const paystackData = await paystackResponse.json();
    
    if (!paystackResponse.ok) {
      return NextResponse.json(
        { message: paystackData.message || 'Payment initialization failed' },
        { status: paystackResponse.status }
      );
    }

    // Store Value4Moni request data for later
    const value4moniData = {
      API_Key: VALUE4MONI_API_KEY,
      Receiver: body.Receiver,
      Volume: (amount * 100).toString(), // Convert to pesewas
      Reference: body.Reference,
      Package_Type: body.Package_Type
    };

    // You might want to store this data in a database
    // await storeValue4MoniRequest(body.Reference, value4moniData);

    return NextResponse.json(paystackData);

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}