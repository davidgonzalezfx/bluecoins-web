const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const formatCurrency = (amount: number) => {
  return formatter.format(amount / 1000000);
};

