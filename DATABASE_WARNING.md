# Database Warning

## ⚠️ CRITICAL: Database Initialization

**READ THIS BEFORE ANY DEPLOYMENT**

### Database Initialization is ONE TIME ONLY

The `npm run init-db` command creates ALL database tables from scratch.

**This should ONLY be run:**
- ✅ During initial project setup on a NEW server
- ✅ When setting up a fresh local development environment

**NEVER run on:**
- ❌ UAT server during deployment
- ❌ Production server during deployment
- ❌ Any server with existing data you want to preserve

### What Happens If You Run init-db on Production?

Running `npm run init-db` on a server with existing data:
1. **Does NOT drop tables** - the script uses `CREATE TABLE IF NOT EXISTS`
2. **Does NOT delete data** - existing records are preserved
3. **BUT** - if you manually drop tables first, you will lose ALL data

### Deployment Scripts Safety

Both `uatdeploy.sh` and `proddeploy.sh`:
- ✅ Build and deploy application code
- ✅ Preserve all database data
- ❌ Do NOT run `init-db`

### Regular Deployments

For regular code updates (new features, bug fixes):
```bash
# UAT
./scripts/uatdeploy.sh

# Production
./scripts/proddeploy.sh
```

**No database operations needed** - data persists automatically.

### Schema Changes (Migrations)

For database schema changes (new columns, tables, constraints):
1. Create a migration script in `scripts/` (e.g., `migrate_pricing.sql`)
2. Run migration on UAT first to test
3. Run migration on production after UAT verification
4. Document migration in CLAUDE.md

**Example migration workflow:**
```bash
# Test on UAT
ssh root@68.183.53.217 "psql -U cms_user -d cms_db -f /home/cms/app/scripts/migrate.sql"

# Verify on UAT
# Then run on production

ssh root@<prod-ip> "psql -U cms_user -d cms_db -f /home/cms/app/scripts/migrate.sql"
```

### First-Time Server Setup

Only for NEW servers (no existing data):

```bash
# 1. Run first-time setup script (installs PostgreSQL, creates user/database)
DB_PASSWORD='strong-password' ./scripts/first-time-setup.sh <ip>

# 2. Deploy application
./scripts/uatdeploy.sh  # or proddeploy.sh

# 3. Initialize database (ONE TIME ONLY)
ssh root@<ip> "cd /home/cms/app && npm run init-db"
```

### Summary

| Scenario | Run init-db? |
|----------|-------------|
| New server setup | ✅ YES |
| Local development (fresh DB) | ✅ YES |
| Regular code deployment | ❌ NO |
| Schema migration | ❌ NO (use migration script) |
| UAT deployment | ❌ NO |
| Production deployment | ❌ NO |

**If unsure, ASK before running init-db.**