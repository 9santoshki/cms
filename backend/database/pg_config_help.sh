#!/bin/bash
# PostgreSQL configuration helper script

echo "To configure PostgreSQL to work with your .env settings, you need to modify the pg_hba.conf file."
echo "This file is typically located at: /etc/postgresql/*/main/pg_hba.conf or /var/lib/pgsql/data/pg_hba.conf"

echo ""
echo "Add the following line to the pg_hba.conf file:"
echo "host    cms_ecomm    sk    127.0.0.1/32    md5"

echo ""
echo "Also, make sure the PostgreSQL server is configured to accept connections on localhost."
echo "Check the postgresql.conf file and ensure the following line is present and not commented:"
echo "listen_addresses = 'localhost'"

echo ""
echo "After making these changes, restart the PostgreSQL service:"
echo "sudo systemctl restart postgresql"

echo ""
echo "Then you can run the database setup with:"
echo "cd /home/santoshk/sk/codebase/newprojs/qwenproj/backend && bash database/test_connection.sh"