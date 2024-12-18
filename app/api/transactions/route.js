import { NextResponse } from 'next/server';

const API_URL = 'https://prod.imaketrading.com/v1/transactions/initialize';
const API_KEY = 'R3oyV3I5WnlqVzpjNTFjOGQ0Yzg1ZTY0ZTI4OWE1NTBlM2Q3YmQxY2ZmYQ==';

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
