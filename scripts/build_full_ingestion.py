# -*- coding: utf-8 -*-
import os, sys, zipfile, re, json, time

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

import pymupde

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUBJECTS_DIR = os.path.join(BASE_DIR, 'subjects')
DATA_DIR = os.path.join(BASE_DIR, 'data')
TEXTBOOKS_PDF_DIR = os.path.join(DATA_DIR, 'textbooks_pdf')
CORPUS_OUTPUT_PATH = os.path.join(DATA_DIR, 'curriculum_official', 'official_textbooks_data.json')
