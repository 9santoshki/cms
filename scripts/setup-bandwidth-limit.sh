#!/bin/bash
# Bandwidth limiting configuration for droplet
# This prevents excessive bandwidth usage from compromises or attacks

set -e

echo "🚦 Setting up bandwidth limiting..."

# Configuration
MAX_DOWNLOAD_MBPS=100  # 100 Mbps download
MAX_UPLOAD_MBPS=50     # 50 Mbps upload (this is what prevents DDoS)
INTERFACE="eth0"       # Default DigitalOcean interface

# Install wondershaper (easy bandwidth limiting tool)
apt-get update
apt-get install -y wondershaper

# Apply bandwidth limits
wondershaper -a $INTERFACE -d $((MAX_DOWNLOAD_MBPS * 1024)) -u $((MAX_UPLOAD_MBPS * 1024))

# Make limits persistent across reboots
cat > /etc/systemd/system/wondershaper.service << EOF
[Unit]
Description=Bandwidth limiting with wondershaper
After=network.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/sbin/wondershaper -a $INTERFACE -d $((MAX_DOWNLOAD_MBPS * 1024)) -u $((MAX_UPLOAD_MBPS * 1024))
ExecStop=/sbin/wondershaper -c -a $INTERFACE

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
systemctl daemon-reload
systemctl enable wondershaper.service
systemctl start wondershaper.service

# Add connection rate limiting with iptables
echo "🚦 Setting up connection rate limiting..."

# Limit new connections per IP to 20/minute
iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --set
iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --update --seconds 60 --hitcount 20 -j DROP

iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --set
iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --update --seconds 60 --hitcount 20 -j DROP

# Limit total concurrent connections per IP
iptables -A INPUT -p tcp --syn --dport 80 -m connlimit --connlimit-above 50 -j REJECT
iptables -A INPUT -p tcp --syn --dport 443 -m connlimit --connlimit-above 50 -j REJECT

# Save iptables rules
iptables-save > /etc/iptables/rules.v4

# Install iptables-persistent to restore rules on reboot
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | debconf-set-selections
apt-get install -y iptables-persistent

echo ""
echo "✅ Bandwidth limiting configured:"
echo "   - Download limit: $MAX_DOWNLOAD_MBPS Mbps"
echo "   - Upload limit: $MAX_UPLOAD_MBPS Mbps"
echo "   - Connection rate limit: 20 connections/minute per IP"
echo "   - Max concurrent connections: 50 per IP"
echo ""
echo "Current bandwidth usage:"
vnstat -l 1 2>/dev/null || echo "Install vnstat to monitor: apt-get install vnstat"
