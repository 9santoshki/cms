/**
 * API-specific type interfaces.
 * These supplement src/types/index.ts with API-layer concerns.
 */

// Re-export from the canonical source to avoid duplication
export type { ApiResponse } from './index';

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: Pagination;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasMore: boolean;
}

// Re-export SessionData from the canonical source so consumers
// can import from a single types location.
export type { SessionData } from '@/lib/db/auth';
