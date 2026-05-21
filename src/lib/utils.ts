/**
 * Shared utility helpers used across client and server code.
 */

/**
 * Returns a human-readable relative time string for a given date.
 * Suitable for display in tables and cards where exact timestamps aren't needed.
 */
export function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never updated';
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}
