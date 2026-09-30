import os, sys, zipfile, re, json, time

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

import pymupdf

print('[Ingester Builder] Ready')
