/**
 * Shared formatting utilities.
 *
 * NOTE: email.ts has its own local copy of formatCurrency / formatDate
 * to avoid bundling server dependencies into the email module.
 * Keep the two copies in sync if you change the format strings.
 */

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatDeliveryDate(dateString: string): string {
  if (!dateString) return 'Delivery date TBD';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}
