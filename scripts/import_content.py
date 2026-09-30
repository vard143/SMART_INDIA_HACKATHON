"""
BHASHASETU: Offline Content Pack Importer
Extracts and loads content-pack-v1.2.0.zip into the local backend storage.
"""

import os
import zipfile
import json
import shutil
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")

def import_content_pack(bundle_path: str):
    if not os.path.exists(bundle_path):
        print(f"Error: Bundle file not found at {bundle_path}")
        return False

    print(f"Importing offline bundle from {bundle_path}...")
    with zipfile.ZipFile(bundle_path, 'r') as zf:
        if "manifest.json" in zf.namelist():
            manifest_data = json.loads(zf.read("manifest.json"))
            print(f"  Bundle Version: {manifest_data.get('version')}")
            print(f"  Languages: {', '.join(manifest_data.get('languages_included', []))}")

        for name in zf.namelist():
            if name != "manifest.json":
                target = os.path.join(BACKEND_DIR, name)
                with open(target, "wb") as f:
                    f.write(zf.read(name))
                print(f"  ✓ Extracted {name} to {target}")

    print("Content pack imported successfully into local backend!")
    return True

if __name__ == "__main__":
    bundle_target = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT_DIR, "bundles", "content-pack-v1.2.0.zip")
    import_content_pack(bundle_target)
