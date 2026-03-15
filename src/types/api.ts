/**
 * API-specific type interfaces.
 * These supplement src/types/index.ts with API-layer concerns.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

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
