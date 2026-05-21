export function validateRequired(fields: Record<string, any>) {
  for (const key in fields) {
    if (!fields[key]) {
      throw new Error(`${key} is required`);
    }
  }
}