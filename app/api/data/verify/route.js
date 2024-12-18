// app/api/payment/data/verify/route.js
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = 'sk_live_1f989bb4583225682fbea8c586d81281ef51e9b6';
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

    // Extract the data purchase details from metadata
    const { 
      receiver, 
      package_type, 
      data_plan,
      reference: dataReference 
    } = verifyData.data.metadata.custom_fields[0];

    // Make the data purchase API call
    const dataResponse = await fetch('https://www.value4moni.com/api/v1/inititate_transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API_Key': API_KEY
      },
      body: JSON.stringify({
        Receiver: receiver,
        Package_Type: package_type,
        Reference: dataReference,
        Volume: data_plan // This should match the data plan value
      })
    });

    if (!dataResponse.ok) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`);
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`);
  }
}