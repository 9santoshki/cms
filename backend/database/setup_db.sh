#!/bin/bash
# Database setup script for user 'sk'

# Create the database
psql -U sk -d postgres -c "CREATE DATABASE cms_ecomm;" 2>/dev/null || echo "Database already exists or error occurred"

# Connect to the database and create tables
psql -U sk -d cms_ecomm -f /home/santoshk/sk/codebase/newprojs/qwenproj/backend/database/schema.sql

echo "Database setup completed!"