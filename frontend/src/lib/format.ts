//////////////////////////////////////////////////////
// CURRENCY
//////////////////////////////////////////////////////

export function formatCurrency(
  value: number,
  locale = "id-ID",
  currency = "IDR",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

//////////////////////////////////////////////////////
// NUMBER
//////////////////////////////////////////////////////

export function formatNumber(
  value: number | string,
): string {
  const amount =
    typeof value === "string"
      ? Number(value)
      : value;

  return new Intl.NumberFormat(
    "id-ID",
  ).format(amount);
}

//////////////////////////////////////////////////////
// PERCENT
//////////////////////////////////////////////////////

export function formatPercent(
  value: number,
): string {
  return `${value.toFixed(0)}%`;
}