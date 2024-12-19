export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);

export const formatMonthYear = (dateObj) =>
  new Date(dateObj.year, dateObj.month - 1).toLocaleDateString("en-US", {
    month: "short",
  });

export const calculatePercentage = (current, goal) =>
  ((current / goal) * 100).toFixed(1);
