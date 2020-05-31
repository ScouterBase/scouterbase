export function mapToList<T>(mapInput: Record<string, T>): T[] {
  return Object.keys(mapInput).map(key => mapInput[key]);
}

export function listToMap<T, K extends keyof T>(list: T[], key: K): Record<string, T> {
  return list.reduce((o: Record<string, T>, item: T) => {
    o[(item[`${key}`] as any).toString()] = item;
    return o;
  }, {});
}

// export function listToMap(list: Appointment[]): Record<string, Appointment> { // TODO: Make generic and move to helpers
//   return list.reduce((o: Record<string, Appointment>, appointment) => {
//     o[appointment.id.toString()] = appointment;
//     return o;
//   }, {});
// }
