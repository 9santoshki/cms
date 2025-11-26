// lib/razorpay.ts
import Razorpay from 'razorpay';

let razorpay: Razorpay;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.warn('Razorpay credentials not found. Payment functionality may not work properly.');
  // Create a dummy Razorpay instance for development
  razorpay = {
    orders: {
      create: async () => ({
        id: 'order_test',
        entity: 'order',
        amount: 0,
        amount_paid: 0,
        amount_due: 0,
        currency: 'INR',
        receipt: 'receipt#1',
        status: 'created',
        attempts: 0,
        notes: [],
        created_at: Math.floor(Date.now() / 1000),
      }),
    },
  } as any;
}

export default razorpay;