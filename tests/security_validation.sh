#!/bin/bash

# Security validation test script for the CMS application
# This script validates that Row Level Security (RLS) policies are working correctly

echo "Starting Security Validation Tests..."

# Base URL for the application (change to your actual URL if deployed)
BASE_URL="http://localhost:3000"

echo "Testing API endpoints for security validation..."

# 1. Test anonymous access to products (should be allowed)
echo "1. Testing anonymous access to products (should be allowed)..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/products")
if [ $response -eq 200 ]; then
    echo "✓ Public read access to products: PASSED"
else
    echo "✗ Public read access to products: FAILED (Status: $response)"
fi

# 2. Test unauthorized access to orders (should fail)
echo "2. Testing unauthorized access to orders (should fail)..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/orders")
if [ $response -eq 401 ]; then
    echo "✓ Unauthorized read access to orders: PASSED"
else
    echo "✗ Unauthorized read access to orders: FAILED (Status: $response)"
fi

# 3. Test unauthorized access to user profile (should fail)
echo "3. Testing unauthorized access to user profile (should fail)..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/profile")
if [ $response -eq 401 ]; then
    echo "✓ Unauthorized access to profile: PASSED"
else
    echo "✗ Unauthorized access to profile: FAILED (Status: $response)"
fi

# 4. Test creating order without authentication (should fail)
echo "4. Testing order creation without authentication (should fail)..."
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{}' "$BASE_URL/api/orders")
if [ $response -eq 401 ]; then
    echo "✓ Unauthorized order creation: PASSED"
else
    echo "✗ Unauthorized order creation: FAILED (Status: $response)"
fi

# 5. Test cart operations without authentication (should work for guest cart)
echo "5. Testing cart operations without authentication (should work for guest cart)..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/cart")
if [ $response -eq 200 ]; then
    echo "✓ Guest cart access: PASSED"
else
    echo "✗ Guest cart access: FAILED (Status: $response)"
fi

# 6. Test accessing dashboard without authentication (should redirect)
echo "6. Testing dashboard access without authentication (should redirect)..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/dashboard")
if [ $response -eq 307 ]; then  # Redirect to auth
    echo "✓ Unauthorized dashboard access: PASSED"
else
    echo "✗ Unauthorized dashboard access: FAILED (Status: $response)"
fi

# 7. Test appointment access without authentication (should fail)
echo "7. Testing appointments access without authentication (should fail)..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/appointments")
if [ $response -eq 401 ]; then
    echo "✓ Unauthorized appointments access: PASSED"
else
    echo "✗ Unauthorized appointments access: FAILED (Status: $response)"
fi

# 8. Test product search
echo "8. Testing product search API (should work anonymously)..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/search/products?q=test")
if [ $response -eq 200 ]; then
    echo "✓ Product search access: PASSED"
else
    echo "✗ Product search access: FAILED (Status: $response)"
fi

echo " "
echo "Security validation tests completed!"