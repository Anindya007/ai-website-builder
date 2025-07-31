// src/app/api/auth-status/route.js
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  
    const { has } = await auth();
    const isPro = has({ plan: 'pro' });
    console.log(isPro)
    return Response.json({ isPro }); 
}
