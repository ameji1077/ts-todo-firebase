export function setSessionItem<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionItem<T>(key: string): T | null{
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}

export function removeSessionItem(key: string): void{
  sessionStorage.removeItem(key);
}