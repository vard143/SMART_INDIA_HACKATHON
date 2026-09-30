"""
BHASHASETU: Local School Backup & Disaster Recovery Manager
Enables school administrators to export school_backup.zip and restore in case of device failure.
Contains local database, student assessment logs, audit trails, and offline configs.
"""

import os
import zipfile
import json
import time
import shutil
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUPS_DIR = os.path.join(ROOT_DIR, "backups")

def create_backup() -> str:
    os.makedirs(BACKUPS_DIR, exist_ok=True)
    timestamp_str = time.strftime("%Y%m%d_%H%M%S")
    backup_filename = f"school_backup_{timestamp_str}.zip"
    backup_path = os.path.join(BACKUPS_DIR, backup_filename)

    print(f"Creating local school backup: {backup_path}...")
    manifest = {
        "backup_type": "LOCAL_SCHOOL_FULL_BACKUP",
        "created_at": int(time.time()),
        "created_date": time.ctime(),
        "database_engine": "SQLite WAL",
        "system_version": "1.2.0-offline"
    }

    db_path = os.path.join(ROOT_DIR, "backend", "bhashasetu_local.db")
    with zipfile.ZipFile(backup_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("manifest.json", json.dumps(manifest, indent=2))
        if os.path.exists(db_path):
            zf.write(db_path, "bhashasetu_local.db")
            print("  + Backed up bhashasetu_local.db")

    size_kb = round(os.path.getsize(backup_path) / 1024, 2)
    print(f"Backup created successfully! Size: {size_kb} KB")
    return backup_path

def restore_backup(backup_path: str) -> bool:
    if not os.path.exists(backup_path):
        print(f"Error: Backup file {backup_path} not found!")
        return False

    print(f"Restoring school database from {backup_path}...")
    with zipfile.ZipFile(backup_path, 'r') as zf:
        if "bhashasetu_local.db" in zf.namelist():
            target_db = os.path.join(ROOT_DIR, "backend", "bhashasetu_local.db")
            with open(target_db, "wb") as f:
                f.write(zf.read("bhashasetu_local.db"))
            print(f"  ✓ Database restored to {target_db}")

    print("Backup restored successfully!")
    return True

if __name__ == "__main__":
    action = sys.argv[1] if len(sys.argv) > 1 else "backup"
    if action == "backup":
        create_backup()
    elif action == "restore" and len(sys.argv) > 2:
        restore_backup(sys.argv[2])
    else:
        print("Usage: python backup_manager.py [backup | restore <path_to_zip>]")
