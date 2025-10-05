// Utility functions for formatting data

// Format currency in Indian Rupees
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format rating
export const formatRating = (rating) => {
  return rating.toFixed(1);
};

// Format delivery date
export const formatDeliveryDate = (deliveryDate) => {
  if (deliveryDate === "Tomorrow") {
    return "Tomorrow";
  }
  return deliveryDate;
};