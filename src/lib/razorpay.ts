// lib/razorpay.ts
import Razorpay from 'razorpay';

let razorpayInstance: Razorpay | null = null;

function getRazorpayInstance() {
  if (razorpayInstance) {
    return razorpayInstance;
  }

  // Only initialize at runtime, not at build time
  if (typeof window !== 'undefined' || process.env.NODE_ENV !== 'production' || process.env.RAZORPAY_KEY_ID) {
    try {
      if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpayInstance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
      } else {
        console.warn('Razorpay credentials not found. Payment functionality may not work properly.');
        // Create a dummy Razorpay instance for development
        razorpayInstance = {
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
    } catch (error) {
      console.error('Failed to initialize Razorpay:', error);
      // Return dummy instance if initialization fails
      razorpayInstance = {
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
  }

  return razorpayInstance;
}

// Export a getter object that delays initialization
export default {
  get orders() {
    return getRazorpayInstance()?.orders;
  },
  get payments() {
    return getRazorpayInstance()?.payments;
  },
} as Razorpay;