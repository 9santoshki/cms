# Webhook Testing Guide

This document explains how to test webhook endpoints in the application, specifically for payment provider integrations like Razorpay.

## Security Requirement

All webhook endpoints must verify the signature of incoming requests to ensure they originate from the legitimate payment provider. This prevents malicious actors from sending fake webhook events to your application.

## Current Webhook Implementation

### Payment Verification Endpoint
- Path: `/api/checkout/verify`
- Purpose: Verifies payment completion from Razorpay
- Security Measure: Verifies Razorpay signature using HMAC-SHA256

## Testing Strategy

### Option 1: Using Ngrok (Recommended for local development)
1. Install ngrok: `npm install -g ngrok`
2. Start ngrok tunnel: `ngrok http 3000`
3. Note the HTTPS URL provided by ngrok
4. Update your Razorpay dashboard with this URL as the webhook endpoint

### Option 2: Using curl with sample payloads
For testing without exposing your local server, use curl with sample payloads that match Razorpay's webhook format.

## Sample Test Commands

### Simulating a Payment Successful Event
```bash
curl -X POST http://localhost:3000/api/checkout/verify \
  -H "Content-Type: application/json" \
  -H "X-Razorpay-Signature: <calculated_signature>" \
  -d '{
    "event": "payment.captured",
    "payload": {
      "payment": {
        "entity": {
          "id": "pay_test1234567890",
          "order_id": "order_test1234567890",
          "signature": "test_signature"
        }
      }
    }
  }'
```

### Headers Required for Testing
- `X-Razorpay-Signature` - Contains the signature to verify the authenticity of the webhook

### Payload Format
The payload should match Razorpay's webhook format with the following structure:
- `event` - The type of event (e.g., "payment.captured")
- `payload.payment.entity.id` - The payment ID
- `payload.payment.entity.order_id` - The associated order ID

## Verification Process

When testing, verify that:
1. The endpoint accepts requests with valid signatures
2. The endpoint rejects requests with invalid signatures
3. The endpoint correctly processes the event and updates the relevant entities in the database
4. Proper logging occurs for debugging purposes
5. Appropriate response codes are returned (typically 200 for successful processing)

## Troubleshooting Common Issues

1. **Signature Verification Failure**: Ensure your `RAZORPAY_KEY_SECRET` environment variable matches the one in your Razorpay dashboard
2. **Invalid Payload Format**: Verify that the payload structure matches the expected format from the payment provider
3. **Authentication Problems**: Webhook endpoints often bypass standard authentication and rely on signature verification alone