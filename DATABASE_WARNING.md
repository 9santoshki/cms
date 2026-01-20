# ⚠️ CRITICAL: Database Operations - READ THIS FIRST ⚠️

## 🚨 NEVER DELETE DATABASE DATA DURING DEPLOYMENT 🚨

### ⛔ DANGER ZONE - COMMANDS THAT DESTROY DATA

**NEVER RUN THESE COMMANDS ON PRODUCTION OR UAT:**

```bash
# ❌ NEVER RUN - Deletes ALL data
npm run init-db

# ❌ NEVER RUN - Drops and recreates database
psql -c "DROP DATABASE cms_db;"

# ❌ NEVER RUN - Deletes all rows from tables
psql -c "TRUNCATE users, products, orders CASCADE;"

# ❌ NEVER RUN - Drops tables
psql -c "DROP TABLE IF EXISTS users CASCADE;"
```

### ✅ SAFE OPERATIONS DURING DEPLOYMENT

**These are safe to run during deployment:**

```bash
# ✅ Deploy application code
./scripts/uatdeploy.sh
./scripts/proddeploy.sh

# ✅ Restart application
ssh root@<ip> "pm2 restart cms-app"

# ✅ Check logs
ssh root@<ip> "pm2 logs cms-app"

# ✅ Read-only database queries
psql -c "SELECT COUNT(*) FROM users;"
psql -c "SELECT id, name FROM products LIMIT 10;"
```

## 📋 Database Initialization is ONE-TIME ONLY

### When to Run `npm run init-db`

**ONLY run database initialization in these scenarios:**

1. **First-time server setup** - When setting up a brand new server
2. **Fresh local development** - When creating your local development database
3. **After catastrophic data loss** - Only with explicit approval from stakeholders

### When NOT to Run `npm run init-db`

**NEVER run during:**

- ❌ Regular deployments (UAT or production)
- ❌ Code updates
- ❌ Feature releases
- ❌ Bug fixes
- ❌ Image updates
- ❌ Configuration changes
- ❌ Any routine deployment

## 🔄 Deployment Workflow (Safe)

### Regular Deployment Process

```bash
# 1. Commit changes on master
git add .
git commit -m "Your changes"
git push

# 2. Deploy to UAT
./scripts/uatdeploy.sh
# ✅ Application code updated
# ✅ Database data preserved
# ✅ User sessions continue

# 3. Test on UAT
# Visit https://uat.colourmyspace.com
# Test all features

# 4. Promote to production
git checkout production
git merge master --no-ff
git push origin production

# 5. Deploy to production
./scripts/proddeploy.sh
# ✅ Application code updated
# ✅ Database data preserved
# ✅ User sessions continue
```

**IMPORTANT:** Notice that `npm run init-db` is NOT part of the deployment workflow!

## 🗃️ Database Schema Changes (Safe Way)

### When You Need to Modify Database Schema

Instead of running `init-db`, use **database migrations**:

```bash
# 1. Create migration file
cat > scripts/migrations/001_add_new_column.sql << 'EOF'
-- Migration: Add new column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS new_field VARCHAR(255);
EOF

# 2. Test migration locally
psql -U sk -d cmsdb -f scripts/migrations/001_add_new_column.sql

# 3. Run on UAT
ssh root@68.183.53.217 "cd /home/cms/app && PGPASSWORD='...' psql -h localhost -U cms_user -d cms_db -f scripts/migrations/001_add_new_column.sql"

# 4. Verify UAT works
# Visit https://uat.colourmyspace.com

# 5. Run on production
ssh root@68.183.53.217 "cd /home/cms/app-prod && PGPASSWORD='...' psql -h localhost -U cms_user -d cms_db -f scripts/migrations/001_add_new_column.sql"
```

**Key points:**
- ✅ Migrations add/modify schema without deleting data
- ✅ Use `IF NOT EXISTS` to make migrations idempotent
- ✅ Test on UAT before production
- ✅ Keep migration files in git for audit trail

## 📊 Production Database Statistics

### Current Data (as of deployment)

```sql
-- Check what you have before making changes
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'appointments', COUNT(*) FROM appointments
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews;
```

**Example output:**
```
  table_name  | count
--------------+-------
  users       |    45
  products    |    12
  orders      |    87
  appointments|    23
  reviews     |    34
```

**This data is PRECIOUS:**
- Users have accounts
- Orders have payment records
- Reviews are customer feedback
- Appointments are business commitments

### Before ANY Database Operation

**ALWAYS:**
1. ✅ Backup the database first
2. ✅ Test on UAT
3. ✅ Get approval from stakeholders
4. ✅ Have a rollback plan

## 💾 Database Backup Before Changes

### Create Backup

```bash
# Backup UAT database
ssh root@68.183.53.217 "PGPASSWORD='...' pg_dump -h localhost -U cms_user cms_db > /tmp/cms_db_backup_$(date +%Y%m%d_%H%M%S).sql"

# Download backup locally
scp root@68.183.53.217:/tmp/cms_db_backup_*.sql ./backups/

# Backup production database
ssh root@68.183.53.217 "PGPASSWORD='...' pg_dump -h localhost -U cms_user cms_db > /tmp/cms_db_prod_backup_$(date +%Y%m%d_%H%M%S).sql"
```

### Restore Backup (If Needed)

```bash
# Restore from backup
ssh root@68.183.53.217 "PGPASSWORD='...' psql -h localhost -U cms_user cms_db < /tmp/cms_db_backup_20260120_120000.sql"
```

## 🎯 First-Time Setup vs Regular Deployment

### First-Time Setup (ONE TIME ONLY)

This is when you setup a brand new server for the first time:

```bash
# 1. Setup server security
DB_PASSWORD='...' ./scripts/first-time-setup.sh <ip>

# 2. Deploy environment file
./scripts/deploy-env.sh

# 3. Deploy application
./scripts/uatdeploy.sh

# 4. Initialize database (ONE TIME ONLY!)
ssh root@<ip> "cd /home/cms/app && npm run init-db"

# 5. Verify
ssh root@<ip> "cd /home/cms/app && PGPASSWORD='...' psql -h localhost -U cms_user cms_db -c '\dt'"
```

**You will NEVER need to run step 4 again on this server!**

### Regular Deployment (Every Time)

```bash
# 1. Deploy code
./scripts/uatdeploy.sh

# 2. Test
# Visit https://uat.colourmyspace.com

# That's it! Database is unchanged.
```

## 📝 Deployment Checklist

Before every deployment, check:

- [ ] ✅ Code changes committed to git
- [ ] ✅ UAT testing completed
- [ ] ✅ No `npm run init-db` in deployment steps
- [ ] ✅ No database drop/truncate commands
- [ ] ✅ Database migrations tested (if any)
- [ ] ✅ Backup taken (if schema changes)
- [ ] ✅ Rollback plan ready

## 🆘 What If You Accidentally Deleted Data?

### Immediate Actions

1. **STOP** - Don't run any more commands
2. **Check backups** - Find the most recent backup
3. **Restore immediately** - Use backup restoration commands above
4. **Notify stakeholders** - Inform about data loss
5. **Document incident** - What happened, what was lost, how restored

### Prevention

- Always use `IF NOT EXISTS` in schema changes
- Test on local/UAT before production
- Keep regular backups (automated daily)
- Never run destructive commands without confirmation
- Code review any database-related scripts

## 📚 Summary

### Golden Rules

1. **Database initialization = ONE TIME ONLY** (at first setup)
2. **Regular deployments = NO database changes**
3. **Schema changes = Use migrations, not init-db**
4. **Before ANY database operation = BACKUP FIRST**
5. **When in doubt = ASK, don't guess**

### The Only Database Command You Need During Deployment

```bash
# Nothing! The deployment scripts handle everything.
./scripts/uatdeploy.sh      # Deploys code, preserves data
./scripts/proddeploy.sh     # Deploys code, preserves data
```

---

**Remember:** Your database contains:
- Real customer accounts
- Real orders with real money
- Real appointments with real people
- Real business data

**TREAT IT WITH EXTREME CARE** ⚠️

---

## 📞 Questions?

If you're unsure about ANY database operation:

1. **STOP** - Don't run the command
2. **READ** - Review this document
3. **ASK** - Get clarification from team
4. **TEST** - Try on local first, then UAT
5. **BACKUP** - Before touching production

**Never rush database operations. Ever.**
