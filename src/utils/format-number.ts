import dayjs from 'dayjs';

export function formatCurrency(amount: number) {
  if (!amount && amount !== 0) return '--';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
}

export const formatNumber = (value: number | string) => {
  return new Intl.NumberFormat().format(Number(value));
};

export function formatNumberNormal(amount: number) {
  if (!amount && amount !== 0) return '--';
  return new Intl.NumberFormat('en-US').format(amount);
}

export function formatNumberPercent(amount: number) {
  if (!amount && amount !== 0) return '--';
  return new Intl.NumberFormat('en-US').format(amount) + '%';
}

export function formatDate(
  value: dayjs.ConfigType,
  formatString = 'YYYY-MM-DD'
  // formatString = 'DD/MM/YYYY'
) {
  if (value) {
    return dayjs(value).format(formatString);
  }
  return;
}

export function formatCurrencyHasCurrency(input: string): string {
  if (!input) {
    return '-';
  }
  const parts = input.split(' ');
  if (parts.length !== 2) {
    return '-';
  }
  const amount = parseFloat(parts[0]);
  if (isNaN(amount)) {
    return '-';
  }
  return `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ` ${parts[1]}`;
}
