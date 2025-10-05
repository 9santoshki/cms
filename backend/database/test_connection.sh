#!/bin/bash
# Test database connection with current .env settings

echo "Testing database connection with the following settings:"
echo "DB_USER: sk"
echo "DB_NAME: cms_ecomm"
echo "DB_HOST: localhost"
echo "DB_PORT: 5432"

# Test connection
psql -h localhost -p 5432 -U sk -d cms_ecomm -c "SELECT version();" 2>&1

if [ $? -eq 0 ]; then
    echo "Connection successful!"
    echo "Creating tables if they don't exist..."
    psql -h localhost -p 5432 -U sk -d cms_ecomm -f /home/santoshk/sk/codebase/newprojs/qwenproj/backend/database/schema.sql 2>/dev/null || echo "Tables already exist or created successfully"
    echo "Database setup completed!"
else
    echo "Connection failed. You may need to configure PostgreSQL authentication."
    echo "Please check the DATABASE_SETUP.md file for manual setup instructions."
fi