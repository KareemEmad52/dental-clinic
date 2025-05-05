export function exclude<T, key extends keyof T>(
  user: T,
  keys: key[]
): Omit<T, key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}
