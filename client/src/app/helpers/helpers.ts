export function mapToList<T>(mapInput: Record<string, T>): T[] {
  return Object.keys(mapInput).map(key => mapInput[key]);
}

export function listToMap<T, K extends keyof T>(list: T[], key: K): Record<string, T> {
  return list.reduce((o: Record<string, T>, item: T) => {
    o[(item[`${key}`] as any).toString()] = item;
    return o;
  }, {});
}

export function dateToStringWithoutTimezone(date: Date): string {
  const dateISOString = dateToISODateString(date);
  const timeISOString = timeToISODateString(date);
  return dateISOString + 'T' + timeISOString;
}

export function dateToISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function timeToISODateString(date: Date): string {
  const hours = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  return [
    (hours > 9 ? '' : '0') + hours,
    (minute > 9 ? '' : '0') + minute,
    (seconds > 9 ? '' : '0') + seconds
  ].join(':');
}
