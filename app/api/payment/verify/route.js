// app/api/payment/verify/route.js
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = 'sk_live_b0c2c918f16461c840014a8febea59346071c7d8';
const API_KEY = 'e798052c-8853-41f6-8eee-4908d367258b';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    // Verify payment with Paystack
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok || !verifyData.status) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`);
    }

    // Extract the airtime purchase details from metadata
    const { receiver, package_type, reference: airtimeReference } = verifyData.data.metadata.custom_fields[0];

    // Make the airtime purchase API call
    const airtimeResponse = await fetch('https://www.value4moni.com/api/v1/inititate_transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API_Key': API_KEY
      },
      body: JSON.stringify({
        Receiver: receiver,
        Package_Type: package_type,
        Reference: airtimeReference,
        Volume: (verifyData.data.amount / 100).toString() // Convert back from kobo/pesewas
      })
    });

    if (!airtimeResponse.ok) {
      // Handle failed airtime purchase after successful payment
      // You might want to implement a retry mechanism or manual intervention
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`);
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`);
  }
}