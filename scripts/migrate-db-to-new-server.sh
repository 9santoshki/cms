#!/bin/bash
# ONE-TIME migration of cms_db + cms_db_prod data from the old droplet to
# the new shared server's cms_uat_db / cms_prod_db.
#
# Does NOT run init-db anywhere (see DATABASE_WARNING.md) — pg_restore
# recreates the full schema + data directly from the dump.
#
# Usage: ./scripts/migrate-db-to-new-server.sh

set -e

OLD_IP="68.183.53.217"
NEW_IP="2a01:4f9:c015:3132::1"
TMP_DIR="/tmp/cms-migration"
mkdir -p "$TMP_DIR"

migrate_one() {
    local old_db="$1" new_db="$2" new_user="$3" label="$4"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Migrating $label: $old_db -> $new_db"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    echo "📤 Dumping $old_db on old droplet..."
    ssh "root@$OLD_IP" "sudo -u postgres pg_dump -Fc -f /tmp/${old_db}.dump ${old_db}"

    echo "⬇️  Pulling dump locally..."
    scp "root@$OLD_IP:/tmp/${old_db}.dump" "$TMP_DIR/${old_db}.dump"
    ssh "root@$OLD_IP" "rm -f /tmp/${old_db}.dump"

    echo "⬆️  Pushing dump to new server..."
    scp "$TMP_DIR/${old_db}.dump" "root@[$NEW_IP]:/tmp/${old_db}.dump"

    echo "📥 Restoring into $new_db (owned by $new_user)..."
    # Recreate the target database fresh each time rather than relying on
    # pg_restore --clean: if a previous run left objects owned by a
    # different role (e.g. a partial/failed restore), --clean's DROP
    # statements fail with "must be owner of table X" since a non-superuser
    # --role can't drop another role's objects — silently leaving stale,
    # wrongly-owned objects behind. A fresh DB + --role=$new_user restore
    # guarantees every object is created directly as $new_user.
    ssh "root@$NEW_IP" bash << ENDSSH
set -e
sudo -u postgres psql -c "DROP DATABASE IF EXISTS $new_db;"
sudo -u postgres psql -c "CREATE DATABASE $new_db OWNER $new_user;"
sudo -u postgres psql -d $new_db -v ON_ERROR_STOP=1 \
    -c "GRANT ALL PRIVILEGES ON SCHEMA public TO $new_user;" \
    -c "ALTER SCHEMA public OWNER TO $new_user;" \
    -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $new_user;" \
    -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $new_user;" \
    -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO $new_user;"
sudo -u postgres pg_restore --no-owner --no-privileges \
    --role=$new_user -d $new_db /tmp/${old_db}.dump
sudo -u postgres psql -d $new_db -v ON_ERROR_STOP=1 \
    -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO $new_user;" \
    -c "GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO $new_user;" \
    -c "GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO $new_user;"
rm -f /tmp/${old_db}.dump
ENDSSH

    rm -f "$TMP_DIR/${old_db}.dump"

    echo ""
    echo "🔍 Row-count spot check ($label):"
    for table in users products orders; do
        old_count=$(ssh "root@$OLD_IP" "sudo -u postgres psql -tAc \"SELECT count(*) FROM $table\" $old_db" 2>/dev/null || echo "n/a")
        new_count=$(ssh "root@$NEW_IP" "sudo -u postgres psql -tAc \"SELECT count(*) FROM $table\" $new_db" 2>/dev/null || echo "n/a")
        status="⚠️ MISMATCH"
        [ "$old_count" = "$new_count" ] && status="✅"
        printf "   %-10s old=%-6s new=%-6s %s\n" "$table" "$old_count" "$new_count" "$status"
    done
}

migrate_one "cms_db" "cms_uat_db" "cms_uat_user" "UAT"
migrate_one "cms_db_prod" "cms_prod_db" "cms_prod_user" "PROD"

echo ""
echo "✅ Migration complete for both databases."
echo "⚠️  Verify row counts above match before proceeding to deploy/cutover."
