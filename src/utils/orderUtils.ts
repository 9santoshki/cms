export const formatOrderNumber = (id: number | string): string =>
  `NDS${String(id).padStart(6, '0')}`;
