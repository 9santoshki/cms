# CMS Deployment Guide - Digital Ocean with PM2

This guide walks you through deploying the CMS (Color My Space) Next.js application on a Digital Ocean droplet using PM2 for process management.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Database Configuration](#database-configuration)
4. [Application Deployment](#application-deployment)
5. [PM2 Process Management](#pm2-process-management)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL Setup](#ssl-setup)
8. [Environment Variables](#environment-variables)
9. [Maintenance & Monitoring](#maintenance--monitoring)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Digital Ocean account
- Domain name (optional but recommended)
- SSH key pair for secure access
- Local terminal access

---

## Server Setup

### 1. Create Digital Ocean Droplet

1. **Log into Digital Ocean** and create a new droplet:
   - **Image**: Ubuntu 24.04 LTS
   - **Plan**: Basic (minimum 2GB RAM, 2 vCPUs recommended)
   - **Datacenter**: Choose closest to your users
   - **Authentication**: SSH keys (recommended) or password
   - **Hostname**: `cms-production` or your preferred name

2. **Note your droplet's IP address** after creation

### 2. Initial Server Configuration

SSH into your droplet:

```bash
ssh root@your_droplet_ip
```

Update system packages:

```bash
apt update && apt upgrade -y
```

### 3. Install Required Software

#### Install Node.js 20.x

```bash
# Install Node.js repository
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js and npm
apt install -y nodejs

# Verify installation
node --version  # Should show v20.x
npm --version
```

#### Install PostgreSQL

```bash
# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Verify installation
systemctl status postgresql
```

#### Install Nginx

```bash
# Install Nginx
apt install -y nginx

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx
```

#### Install PM2 Globally

```bash
npm install -g pm2

# Verify installation
pm2 --version
```

#### Install Build Tools

These are needed for native Node.js modules like `sharp`:

```bash
apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

### 4. Create Application User

For security, run the application as a non-root user:

```bash
# Create user
adduser --disabled-password --gecos "" cms

# Add to sudo group (optional)
usermod -aG sudo cms

# Switch to cms user
su - cms
```

---

## Database Configuration

### 1. Create PostgreSQL Database and User

Switch to postgres user:

```bash
sudo -u postgres psql
```

In the PostgreSQL prompt, run:

```sql
-- Create database
CREATE DATABASE cms_db;

-- Create user with password
CREATE USER cms_user WITH PASSWORD 'your_secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE cms_db TO cms_user;

-- Exit
\q
```

### 2. Configure PostgreSQL Authentication

Edit the PostgreSQL configuration:

```bash
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Find the line that says `local all all peer` and change it to:

```
local   all             all                                     md5
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

### 3. Test Database Connection

```bash
psql -h localhost -U cms_user -d cms_db
# Enter password when prompted
# Type \q to exit
```

---

## Application Deployment

### 1. Clone Repository

As the `cms` user:

```bash
cd /home/cms
git clone https://github.com/yourusername/your-repo.git app
cd app
```

Or upload your code using SCP/SFTP if not using Git:

```bash
# From your local machine:
scp -r /path/to/your/cms root@your_droplet_ip:/home/cms/app
```

### 2. Install Dependencies

```bash
cd /home/cms/app
npm install
```

### 3. Configure Environment Variables

Create `.env.local` file:

```bash
nano .env.local
```

Add the following (replace with your actual values):

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cms_db
DB_USER=cms_user
DB_PASSWORD=your_secure_password_here

# JWT Secret (generate a strong random string)
JWT_SECRET=your_very_long_random_jwt_secret_key_here

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production

# Cloudflare R2 (if using)
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
```

**Important**: Generate a secure JWT secret:

```bash
# Generate a random JWT secret
openssl rand -base64 64
```

### 4. Initialize Database

Run the database initialization script:

```bash
npm run init-db
```

This will create all necessary tables and schema.

### 5. Build the Application

```bash
npm run build
```

This may take a few minutes. Wait for the build to complete successfully.

---

## PM2 Process Management

### 1. Create PM2 Ecosystem File

Create a PM2 configuration file for better management:

```bash
nano ecosystem.config.js
```

Add the following content:

```javascript
module.exports = {
  apps: [{
    name: 'cms-app',
    script: 'npm',
    args: 'start',
    cwd: '/home/cms/app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/cms/logs/error.log',
    out_file: '/home/cms/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

Create logs directory:

```bash
mkdir -p /home/cms/logs
```

### 2. Start Application with PM2

```bash
cd /home/cms/app
pm2 start ecosystem.config.js
```

### 3. Configure PM2 to Start on Boot

```bash
# Generate startup script (run as cms user)
pm2 startup

# This will output a command to run as root. Copy and run it.
# Example output:
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u cms --hp /home/cms

# After running the sudo command, save PM2 process list
pm2 save
```

### 4. Verify Application is Running

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs cms-app

# Monitor resources
pm2 monit
```

---

## Nginx Configuration

### 1. Create Nginx Site Configuration

As root user:

```bash
sudo nano /etc/nginx/sites-available/cms
```

Add the following configuration:

```nginx
# Rate limiting zone
limit_req_zone $binary_remote_addr zone=cms_limit:10m rate=10r/s;

# Upstream Next.js server
upstream nextjs_backend {
    server localhost:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Increase client body size for image uploads
    client_max_body_size 10M;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/cms-access.log;
    error_log /var/log/nginx/cms-error.log;

    # Proxy to Next.js application
    location / {
        limit_req zone=cms_limit burst=20 nodelay;

        proxy_pass http://nextjs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://nextjs_backend;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Cache images
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://nextjs_backend;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Replace `yourdomain.com`** with your actual domain name.

### 2. Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/cms /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 3. Configure Firewall

```bash
# Install UFW if not already installed
sudo apt install -y ufw

# Allow SSH (important!)
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## SSL Setup

### 1. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 3. Test Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically sets up a cron job for renewal
```

### 4. Verify SSL

Visit `https://yourdomain.com` in your browser to verify SSL is working.

---

## Environment Variables

### Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://yourdomain.com/auth/callback`
   - `https://yourdomain.com/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env.local`

### Razorpay Configuration

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from the dashboard
3. Add keys to `.env.local`

---

## Maintenance & Monitoring

### PM2 Commands

```bash
# View all processes
pm2 list

# View real-time logs
pm2 logs cms-app

# View last 100 lines of logs
pm2 logs cms-app --lines 100

# Monitor CPU and memory
pm2 monit

# Restart application
pm2 restart cms-app

# Stop application
pm2 stop cms-app

# Delete from PM2
pm2 delete cms-app

# Clear logs
pm2 flush
```

### Deployment Updates

Create a deployment script for easy updates:

```bash
nano /home/cms/deploy.sh
```

Add the following:

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Navigate to app directory
cd /home/cms/app

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart cms-app

echo "✅ Deployment complete!"

# Show status
pm2 status
```

Make it executable:

```bash
chmod +x /home/cms/deploy.sh
```

Run deployments with:

```bash
/home/cms/deploy.sh
```

### Database Backups

Create a backup script:

```bash
mkdir -p /home/cms/backups
nano /home/cms/backup-db.sh
```

Add the following:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/cms/backups"
DB_NAME="cms_db"
DB_USER="cms_user"

# Create backup
PGPASSWORD="your_db_password" pg_dump -U $DB_USER -h localhost $DB_NAME > "$BACKUP_DIR/db_backup_$DATE.sql"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete

echo "✅ Backup completed: db_backup_$DATE.sql"
```

Make it executable:

```bash
chmod +x /home/cms/backup-db.sh
```

Schedule daily backups with cron:

```bash
crontab -e
```

Add this line to run backup daily at 2 AM:

```
0 2 * * * /home/cms/backup-db.sh >> /home/cms/logs/backup.log 2>&1
```

### Log Rotation

PM2 has built-in log rotation. Configure it:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

### System Resource Monitoring

```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check PM2 process resources
pm2 monit
```

---

## Troubleshooting

### Application Won't Start

**Check PM2 logs:**
```bash
pm2 logs cms-app --lines 50
```

**Common issues:**
- Port 3000 already in use: `lsof -i :3000` then `kill <PID>`
- Environment variables missing: Check `.env.local`
- Database connection failed: Verify PostgreSQL is running and credentials are correct

### Database Connection Errors

**Test database connection:**
```bash
psql -h localhost -U cms_user -d cms_db
```

**Check PostgreSQL status:**
```bash
sudo systemctl status postgresql
```

**View PostgreSQL logs:**
```bash
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

### Nginx Errors

**Test Nginx configuration:**
```bash
sudo nginx -t
```

**View Nginx error logs:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**Restart Nginx:**
```bash
sudo systemctl restart nginx
```

### SSL Certificate Issues

**Check certificate status:**
```bash
sudo certbot certificates
```

**Renew certificate manually:**
```bash
sudo certbot renew
```

**Test renewal:**
```bash
sudo certbot renew --dry-run
```

### Memory Issues

If application crashes due to memory:

**Increase PM2 memory limit:**
```javascript
// In ecosystem.config.js
max_memory_restart: '2G'  // Increase from 1G
```

**Upgrade droplet:**
- Consider upgrading to a larger droplet with more RAM

### Port Conflicts

**Find what's using port 3000:**
```bash
lsof -i :3000
```

**Kill the process:**
```bash
kill -9 <PID>
```

### Google OAuth Not Working

**Check redirect URIs:**
- Ensure `https://yourdomain.com/auth/callback` is in Google Console
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is correct
- Check that domain matches exactly (with or without www)

### Build Failures

**Clear Next.js cache:**
```bash
rm -rf .next
npm run build
```

**Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Security Best Practices

1. **Use SSH keys** instead of passwords
2. **Disable root SSH login** after setting up user account
3. **Keep system updated**: `sudo apt update && sudo apt upgrade`
4. **Use strong passwords** for database and JWT secrets
5. **Enable firewall** (UFW) with only necessary ports open
6. **Regular backups** of database and application
7. **Monitor logs** for suspicious activity
8. **Use HTTPS only** (SSL certificate)
9. **Keep Node.js and dependencies** up to date

---

## Performance Optimization

### Enable Gzip Compression in Nginx

Add to nginx configuration:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Database Optimization

```sql
-- Connect to database
psql -h localhost -U cms_user -d cms_db

-- Analyze tables for query optimization
ANALYZE;

-- Vacuum to reclaim storage
VACUUM;
```

### PM2 Cluster Mode (Optional)

For better performance on multi-core servers:

```javascript
// In ecosystem.config.js
instances: 'max',  // Use all available CPU cores
exec_mode: 'cluster'
```

---

## Quick Reference Commands

```bash
# Application Management
pm2 restart cms-app              # Restart app
pm2 logs cms-app                 # View logs
pm2 monit                        # Monitor resources
/home/cms/deploy.sh              # Deploy updates

# System Management
sudo systemctl restart nginx      # Restart Nginx
sudo systemctl restart postgresql # Restart PostgreSQL
sudo certbot renew               # Renew SSL certificate

# Database Management
/home/cms/backup-db.sh           # Backup database
psql -h localhost -U cms_user -d cms_db  # Connect to database

# Monitoring
pm2 list                         # List all processes
df -h                            # Check disk space
free -h                          # Check memory
top                              # Check CPU usage
```

---

## Support

For issues or questions:
- Check application logs: `pm2 logs cms-app`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check PostgreSQL logs: `sudo tail -f /var/log/postgresql/postgresql-16-main.log`

---

**Deployment complete!** Your CMS application should now be live at `https://yourdomain.com`
