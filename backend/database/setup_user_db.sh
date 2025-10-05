#!/bin/bash
# Database and user setup script

echo "This script needs to be run with sudo privileges to create the database and user."
echo "Please enter your sudo password when prompted."

# Create the PostgreSQL user and database
sudo -u postgres psql -c "CREATE USER sk WITH PASSWORD 'sk';" 2>/dev/null || echo "User 'sk' already exists or error occurred"
sudo -u postgres psql -c "CREATE DATABASE cms_ecomm OWNER sk;" 2>/dev/null || echo "Database 'cms_ecomm' already exists or error occurred"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE cms_ecomm TO sk;" 2>/dev/null || echo "Privileges already granted or error occurred"

# Connect to the database and create tables using the improved schema file
sudo -u postgres psql -d cms_ecomm -f /home/santoshk/sk/codebase/newprojs/qwenproj/backend/database/schema_improved.sql 2>/dev/null || echo "Tables already exist or error occurred"

echo "Database and user setup completed!"
echo "You can now connect to the database with:"
echo "psql -U sk -d cms_ecomm"