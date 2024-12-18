import { NextResponse } from 'next/server';

// Constants
const PAYSTACK_SECRET_KEY = 'sk_live_1f989bb4583225682fbea8c586d81281ef51e9b6';
const VALUE4MONI_API_KEY = 'e798052c-8853-41f6-8eee-4908d367258b';
const VALUE4MONI_API_URL = 'https://www.value4moni.com/api/v1/inititate_transaction';

// Validate airtime package details
function validateAirtimeDetails(details) {
  const { Receiver, Volume, Package_Type } = details;
  
  if (!Receiver || !Volume || !Package_Type) {
    throw new Error('Missing required airtime details');
  }
  
  // Validate package type
  const validPackages = ['AirtelTigo', 'Telecel'];
  if (!validPackages.includes(Package_Type)) {
    throw new Error('Invalid package type. Must be AirtelTigo or Telecel');
  }
  
  // Validate phone number format (basic check)
  if (!/^\d{10}$/.test(Receiver)) {
    throw new Error('Invalid phone number format');
  }
  
  // Validate volume (assuming these are the valid amounts)
  const validVolumes = ['1000', '2000', '3000'];
  if (!validVolumes.includes(Volume)) {
    throw new Error('Invalid volume amount');
  }
}

// Generate unique reference
function generateReference() {
  return `AIRTIME_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.amount || !body.Receiver || !body.Volume || !body.Package_Type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate airtime details
    try {
      validateAirtimeDetails({
        Receiver: body.Receiver,
        Volume: body.Volume,
        Package_Type: body.Package_Type
      });
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    
    // Generate unique reference
    const reference = generateReference();
    
    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: body.email,
        amount: parseInt(body.amount) * 100, // Convert to kobo/pesewas
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/airtime/verify`,
        metadata: {
          custom_fields: [
            {
              receiver: body.Receiver,
              package_type: body.Package_Type,
              volume: body.Volume,
              reference: reference
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
    
    // Store the Value4Moni request data for use after payment verification
    const value4moniData = {
      API_Key: VALUE4MONI_API_KEY,
      Receiver: body.Receiver,
      Volume: body.Volume,
      Reference: reference,
      Package_Type: body.Package_Type
    };
    
    // You might want to store this data in a database for use after payment verification
    // await storeValue4MoniRequest(reference, value4moniData);
    
    return NextResponse.json({
      ...paystackData,
      reference: reference
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Verification endpoint (you'll need to create this separately)
export async function verifyPaymentAndProcessAirtime(paymentReference) {
  try {
    // 1. Verify Paystack payment
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${paymentReference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );
    
    const verifyData = await verifyResponse.json();
    
    if (!verifyData.status || verifyData.data.status !== 'success') {
      throw new Error('Payment verification failed');
    }
    
    // 2. Retrieve stored Value4Moni request data
    // const value4moniData = await retrieveValue4MoniRequest(paymentReference);
    
    // 3. Make Value4Moni API call
    const airtimeResponse = await fetch(VALUE4MONI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value4moniData)
    });
    
    const airtimeData = await airtimeResponse.json();
    
    return airtimeData;
    
  } catch (error) {
    throw new Error(`Airtime processing failed: ${error.message}`);
  }
}