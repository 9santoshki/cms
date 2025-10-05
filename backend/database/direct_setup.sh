#!/bin/bash
# Direct database setup script

echo "Setting up the cms_ecomm database directly..."

# Create tables using the schema file
psql -h localhost -p 5432 -U sk -d cms_ecomm -f /home/santoshk/sk/codebase/newprojs/qwenproj/backend/database/schema.sql

echo "Database setup completed!"
echo "You can now start the backend server with: npm run dev"