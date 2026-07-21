export function formatCurrency(
  value: number | string | null | undefined,
): string {

  const amount =
    Number(value ?? 0);

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  ).format(amount);

}