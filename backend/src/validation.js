// Simple placeholder validation
export function validate(record) {
  // Example: ensure email field exists
  if (!record.email || !record.email.includes('@')) {
    throw new Error('Invalid email');
  }
  return true;
}
