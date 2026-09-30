/**
 * BHASHASETU: Client-Side Offline Persistence Engine (IndexedDB)
 * 
 * Provides robust, structured local storage for 100% offline-first operation on low-cost tablets:
 * - sync_queue: Mutative operations queued while offline
 * - cached_lessons: Curriculum lessons (JCERT / NCERT & custom)
 * - cached_vault: Community Language Vault items
 * - exam_attempts: Offline student assessments and FLN mastery scores
 * - custom_lessons: Teacher created lessons
 * - metadata: Last sync timestamp, term counts, storage statistics
 * 
 * Zero external dependencies. Uses standard W3C IndexedDB API.
 */

const DB_NAME = 'bhashasetu_offline_v1';
const DB_VERSION = 1;

export interface SyncOperation {
  id: string;
  entityType: 'attempt' | 'vault_item' | 'vault_review' | 'custom_lesson';
  entityId: string;
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  endpoint: string;
  payload: any;
  timestamp: number;
  status: 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';
  retryCount: number;
  lastError?: string;
}

export interface OfflineStorageStats {
  pendingSyncCount: number;
  cachedLessonsCount: number;
  cachedVaultItemsCount: number;
  offlineExamAttemptsCount: number;
  offlineCustomLessonsCount: number;
  lastSyncTimestamp: number | null;
  estimatedSizeBytes: number;
}

class OfflineStorageEngine {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this environment'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 1. Sync Queue Store
        if (!db.objectStoreNames.contains('sync_queue')) {
          const syncStore = db.createObjectStore('sync_queue', { keyPath: 'id' });
          syncStore.createIndex('status', 'status', { unique: false });
          syncStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // 2. Cached Lessons Store
        if (!db.objectStoreNames.contains('cached_lessons')) {
          const lessonStore = db.createObjectStore('cached_lessons', { keyPath: 'id' });
          lessonStore.createIndex('grade', 'grade', { unique: false });
          lessonStore.createIndex('subject', 'subject', { unique: false });
        }

        // 3. Cached Community Vault Store
        if (!db.objectStoreNames.contains('cached_vault')) {
          const vaultStore = db.createObjectStore('cached_vault', { keyPath: 'id' });
          vaultStore.createIndex('language', 'language', { unique: false });
          vaultStore.createIndex('validation_status', 'validation_status', { unique: false });
        }

        // 4. Offline Exam Attempts Store
        if (!db.objectStoreNames.contains('exam_attempts')) {
          const examStore = db.createObjectStore('exam_attempts', { keyPath: 'attempt_id' });
          examStore.createIndex('student_name', 'student_name', { unique: false });
          examStore.createIndex('exam_id', 'exam_id', { unique: false });
        }

        // 5. Offline Custom Lessons Store
        if (!db.objectStoreNames.contains('custom_lessons')) {
          db.createObjectStore('custom_lessons', { keyPath: 'lesson_id' });
        }

        // 6. Metadata Store (Key-Value)
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        this.dbPromise = null;
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  // ==========================================
  // SYNC QUEUE OPERATIONS
  // ==========================================

  async enqueueSyncOperation(op: Omit<SyncOperation, 'id' | 'timestamp' | 'status' | 'retryCount'>): Promise<SyncOperation> {
    const db = await this.getDB();
    const fullOp: SyncOperation = {
      ...op,
      id: `op-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      status: 'PENDING',
      retryCount: 0
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readwrite');
      const store = tx.objectStore('sync_queue');
      const req = store.put(fullOp);

      req.onsuccess = () => resolve(fullOp);
      req.onerror = () => reject(req.error);
    });
  }

  async getPendingSyncOperations(): Promise<SyncOperation[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readonly');
      const store = tx.objectStore('sync_queue');
      const req = store.getAll();

      req.onsuccess = () => {
        const allOps: SyncOperation[] = req.result || [];
        const pending = allOps.filter(o => o.status === 'PENDING' || o.status === 'FAILED');
        // Sort by timestamp FIFO
        pending.sort((a, b) => a.timestamp - b.timestamp);
        resolve(pending);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async updateSyncOperationStatus(id: string, status: SyncOperation['status'], error?: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readwrite');
      const store = tx.objectStore('sync_queue');
      const getReq = store.get(id);

      getReq.onsuccess = () => {
        const op: SyncOperation = getReq.result;
        if (!op) {
          resolve();
          return;
        }
        op.status = status;
        if (status === 'FAILED') {
          op.retryCount += 1;
          op.lastError = error;
        }
        const putReq = store.put(op);
        putReq.onsuccess = () => resolve();
        putReq.onerror = () => reject(putReq.error);
      };
      getReq.onerror = () => reject(getReq.error);
    });
  }

  async removeSyncOperation(id: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readwrite');
      const store = tx.objectStore('sync_queue');
      const req = store.delete(id);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // ==========================================
  // CACHED LESSONS OPERATIONS
  // ==========================================

  async cacheLessons(lessons: any[]): Promise<void> {
    if (!lessons || lessons.length === 0) return;
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cached_lessons', 'readwrite');
      const store = tx.objectStore('cached_lessons');
      lessons.forEach(l => {
        if (l && l.id) store.put(l);
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getCachedLessons(grade?: string): Promise<any[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cached_lessons', 'readonly');
      const store = tx.objectStore('cached_lessons');
      const req = store.getAll();

      req.onsuccess = () => {
        const all: any[] = req.result || [];
        if (!grade) {
          resolve(all);
        } else {
          resolve(all.filter(l => l.grade === grade || l.grade_key === grade));
        }
      };
      req.onerror = () => reject(req.error);
    });
  }

  // ==========================================
  // CACHED COMMUNITY VAULT OPERATIONS
  // ==========================================

  async cacheVaultItems(items: any[]): Promise<void> {
    if (!items || items.length === 0) return;
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cached_vault', 'readwrite');
      const store = tx.objectStore('cached_vault');
      items.forEach(item => {
        if (item && item.id) store.put(item);
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getCachedVaultItems(language?: string): Promise<any[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cached_vault', 'readonly');
      const store = tx.objectStore('cached_vault');
      const req = store.getAll();

      req.onsuccess = () => {
        const all: any[] = req.result || [];
        if (!language) {
          resolve(all);
        } else {
          resolve(all.filter(i => (i.language || '').toLowerCase() === language.toLowerCase()));
        }
      };
      req.onerror = () => reject(req.error);
    });
  }

  async saveVaultItemOffline(item: any): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cached_vault', 'readwrite');
      const store = tx.objectStore('cached_vault');
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // ==========================================
  // OFFLINE EXAM ATTEMPTS
  // ==========================================

  async saveExamAttemptOffline(attempt: any): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('exam_attempts', 'readwrite');
      const store = tx.objectStore('exam_attempts');
      const req = store.put(attempt);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async getOfflineExamAttempts(): Promise<any[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('exam_attempts', 'readonly');
      const store = tx.objectStore('exam_attempts');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  // ==========================================
  // OFFLINE CUSTOM LESSONS
  // ==========================================

  async saveCustomLessonOffline(lesson: any): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('custom_lessons', 'readwrite');
      const store = tx.objectStore('custom_lessons');
      const req = store.put(lesson);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async getOfflineCustomLessons(): Promise<any[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('custom_lessons', 'readonly');
      const store = tx.objectStore('custom_lessons');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  // ==========================================
  // METADATA & STORAGE STATS
  // ==========================================

  async setMetadata(key: string, value: any): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('metadata', 'readwrite');
      const store = tx.objectStore('metadata');
      const req = store.put({ key, value, updated_at: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async getMetadata<T = any>(key: string): Promise<T | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('metadata', 'readonly');
      const store = tx.objectStore('metadata');
      const req = store.get(key);
      req.onsuccess = () => {
        const item = req.result;
        resolve(item ? item.value : null);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async getStorageStats(): Promise<OfflineStorageStats> {
    try {
      const pendingOps = await this.getPendingSyncOperations();
      const lessons = await this.getCachedLessons();
      const vault = await this.getCachedVaultItems();
      const attempts = await this.getOfflineExamAttempts();
      const customLessons = await this.getOfflineCustomLessons();
      const lastSync = await this.getMetadata<number>('last_sync_timestamp');

      let estimatedBytes = 0;
      if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        estimatedBytes = estimate.usage || 0;
      }
      if (estimatedBytes === 0) {
        // Fallback estimation
        estimatedBytes = (lessons.length * 4096) + (vault.length * 1024) + (attempts.length * 2048) + 50000;
      }

      return {
        pendingSyncCount: pendingOps.length,
        cachedLessonsCount: lessons.length,
        cachedVaultItemsCount: vault.length,
        offlineExamAttemptsCount: attempts.length,
        offlineCustomLessonsCount: customLessons.length,
        lastSyncTimestamp: lastSync || null,
        estimatedSizeBytes: estimatedBytes
      };
    } catch (e) {
      return {
        pendingSyncCount: 0,
        cachedLessonsCount: 0,
        cachedVaultItemsCount: 0,
        offlineExamAttemptsCount: 0,
        offlineCustomLessonsCount: 0,
        lastSyncTimestamp: null,
        estimatedSizeBytes: 0
      };
    }
  }
}

export const offlineStorage = new OfflineStorageEngine();
