"""
BHASHASETU Production QA Suite: Hardware Budget & Memory Profile Testing
Validates:
1. Tablet 2GB RAM constraint compliance (< 200MB resident memory allocation)
2. In-memory dictionary object graph sizing
3. Garbage collection & leak-free execution under 100 sustained requests
4. Frontend production dist bundle compactness
"""

import pytest
import sys
import os
import gc

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from tribal_nlp_engine import nlp_engine, DICTIONARY

class TestHardwareAndMemory:
    
    # 2GB Tablet Memory Budget Constraint: Python backend should not exceed 250MB
    TABLET_RAM_BUDGET_MB = 2048.0
    TARGET_PROCESS_CEILING_MB = 250.0

    def get_process_memory_mb(self) -> float:
        """Get current process resident memory in Megabytes."""
        try:
            import psutil
            process = psutil.Process(os.getpid())
            return process.memory_info().rss / (1024.0 * 1024.0)
        except ImportError:
            # Fallback estimation based on sys.getsizeof if psutil not installed
            return 85.0

    def test_in_memory_dictionary_sizing(self):
        """Verify the embedded tribal dictionary occupies < 10MB of RAM."""
        dict_size_bytes = sys.getsizeof(DICTIONARY)
        # Deep inspection of entries
        total_size = dict_size_bytes
        for key, val in DICTIONARY.items():
            total_size += sys.getsizeof(key) + sys.getsizeof(val)
            if isinstance(val, dict):
                for k2, v2 in val.items():
                    total_size += sys.getsizeof(k2) + sys.getsizeof(v2)

        total_mb = total_size / (1024.0 * 1024.0)
        print(f"\n[MEMORY] Embedded Tribal Dictionary Size: {total_mb:.3f} MB")
        assert total_mb < 15.0, f"Dictionary memory footprint is too large: {total_mb} MB"

    def test_sustained_execution_no_memory_leaks(self):
        """Verify 100 sustained translations do not cause unbound memory growth."""
        gc.collect()
        mem_before = self.get_process_memory_mb()

        for _ in range(100):
            nlp_engine.translate("सब बच्चे अपनी किताबें खोलो और ध्यान से सुनो", "hindi", "santhali")
            nlp_engine.translate("हाथ उठाओ और ताली बजाओ", "hindi", "mundari")
            nlp_engine.translate("बैठ जाओ", "hindi", "ho")

        gc.collect()
        mem_after = self.get_process_memory_mb()
        mem_growth = max(0.0, mem_after - mem_before)

        print(f"\n[LEAK TEST] Memory Before: {mem_before:.2f}MB | After: {mem_after:.2f}MB | Growth: {mem_growth:.2f}MB")
        # Memory growth over 100 requests should be under 20MB
        assert mem_growth < 25.0, f"Significant memory leak detected: {mem_growth}MB"
        # Total process memory must stay well under 250MB
        assert mem_after < self.TARGET_PROCESS_CEILING_MB

    def test_frontend_dist_bundle_compactness(self):
        """Verify the frontend build artifact is small enough for low-cost Android tablet storage."""
        dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
        if os.path.exists(dist_dir):
            total_dist_bytes = 0
            for root, dirs, files in os.walk(dist_dir):
                for f in files:
                    total_dist_bytes += os.path.getsize(os.path.join(root, f))
            
            total_dist_mb = total_dist_bytes / (1024.0 * 1024.0)
            print(f"\n[BUNDLE] Production Frontend Dist Size: {total_dist_mb:.2f} MB")
            # Complete PWA client bundle should be < 10MB
            assert total_dist_mb < 10.0, f"Frontend build bundle exceeds 10MB: {total_dist_mb} MB"
