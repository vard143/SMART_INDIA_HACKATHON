"""
BHASHASETU: Master Production QA & Test Automation Orchestrator
Executes:
1. Pytest Enterprise Test Suite (API Contract, Security, SLA, Linguistics, NIPUN FLN, Data Integrity, Hardware Budget)
2. 15-Step Zero-Internet Offline Acceptance Suite
3. Offline Dependency & Egress Zero-Leak Audit
4. Multi-Media Pedagogical Ingestion Pipeline Suite
Generates a comprehensive Production Readiness Quality Gate Summary.
"""

import sys
import os
import time
import subprocess
import json

# Force UTF-8 on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

def print_banner(text):
    print("\n" + "=" * 78)
    print(f"  {text}")
    print("=" * 78)

def main():
    t_start = time.perf_counter()
    print_banner("BHASHASETU (भाषा सेतु): PRINCIPAL QA & PRODUCTION VERIFICATION SUITE")
    print(" Target System: Jharkhand PALASH Mother Tongue-Based Multilingual Education (MTB-MLE)")
    print(" Quality Standards: ISO/IEC 25010 Software Quality | OWASP Top 10 API Security")
    print(" Hardware Constraint: Low-Cost Primary School Tablets (<= 2GB RAM, Android 9+)")
    print(" Mandate: Latency < 3.0s | Zero Internet | Ol Chiki (U+1C50-7F) | NIPUN Bharat FLN")
    print("=" * 78)

    results_summary = {}

    # 1. RUN PYTEST PRODUCTION SUITE
    print("\n[PHASE 1/4] Running Industrial Automated Test Suites (pytest)...")
    pytest_cmd = [sys.executable, "-m", "pytest", "tests", "-v", "--tb=short", "-p", "no:warnings"]
    p1 = subprocess.run(pytest_cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    print(p1.stdout)
    if p1.stderr:
        print("[STDERR]", p1.stderr)

    results_summary["Pytest Enterprise Suite"] = "PASSED" if p1.returncode == 0 else "FAILED"

    # 2. RUN ZERO-INTERNET OFFLINE ACCEPTANCE SUITE
    print("\n[PHASE 2/4] Running 15-Step Zero-Internet Offline Acceptance Suite...")
    offline_cmd = [sys.executable, os.path.join("scripts", "test_offline_mode.py")]
    p2 = subprocess.run(offline_cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    print(p2.stdout)
    if p2.stderr:
        print("[STDERR]", p2.stderr)

    results_summary["15-Step Zero-Internet Acceptance Suite"] = "PASSED" if p2.returncode == 0 else "FAILED"

    # 3. RUN OFFLINE DEPENDENCY AUDIT (EGRESS LEAK CHECK)
    print("\n[PHASE 3/4] Running Egress Dependency Audit...")
    dep_cmd = [sys.executable, os.path.join("scripts", "scan_dependencies.py")]
    p3 = subprocess.run(dep_cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    print(p3.stdout)

    # Inspect json report
    dep_report_path = os.path.join(os.path.dirname(__file__), "offline_dependency_report.json")
    zero_internet_verified = False
    if os.path.exists(dep_report_path):
        with open(dep_report_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if data.get("zero_internet_ready") is True and data.get("summary", {}).get("required_online_dependencies") == 0:
                zero_internet_verified = True

    results_summary["Zero External Egress / Zero CDN Audit"] = "PASSED" if zero_internet_verified else "FAILED"

    # 4. RUN TEACHER MEDIA INGESTION SUITE
    print("\n[PHASE 4/4] Running Multi-Media Pedagogical Ingestion Suite...")
    media_cmd = [sys.executable, os.path.join("scripts", "test_media_upload_suite.py")]
    p4 = subprocess.run(media_cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    print(p4.stdout)
    if p4.stderr:
        print("[STDERR]", p4.stderr)

    results_summary["Teacher Media Ingestion Pipeline"] = "PASSED" if p4.returncode == 0 else "FAILED"

    # FINAL QUALITY GATE SCORECARD
    t_end = time.perf_counter()
    duration = t_end - t_start

    print_banner("PRODUCTION READINESS QUALITY SCORECARD")
    all_passed = True
    for suite_name, status in results_summary.items():
        mark = "✓ PASS" if status == "PASSED" else "✗ FAIL"
        if status != "PASSED":
            all_passed = False
        print(f"  {mark:<8} | {suite_name}")

    print("-" * 78)
    print(f"  Total Test Execution Time: {duration:.2f} seconds")
    print(f"  Overall Production Quality Gate: {'✅ READY FOR PRODUCTION DEPLOYMENT & WINNING SIH DEFENSE' if all_passed else '❌ FIXES REQUIRED'}")
    print("=" * 78 + "\n")

    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
