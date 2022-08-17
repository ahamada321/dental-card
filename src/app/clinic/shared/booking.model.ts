import { Clinic } from './clinic.model';

export class Booking {
  static readonly DATE_FORMAT = 'Y-MM-DD';
  _id!: string;
  startAt?: Date;
  oldStartAt?: Date;
  courseTime?: number;
  courseType?: string;
  comment?: string;

  createdAt?: Date;
  user?: any;
  status?: string;

  clinic?: Clinic;
}
