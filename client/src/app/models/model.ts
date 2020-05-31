export interface Appointment {
  readonly id: number;
  readonly title: string;
  readonly startDateTime: Date;
  readonly endDateTime: Date;
  readonly location: string;
}
