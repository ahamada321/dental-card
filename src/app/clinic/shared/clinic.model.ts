import { Report } from 'src/app/auth/shared/report.model';
import { Booking } from './booking.model';
export class Clinic {
  _id?: string;
  length?: any;
  createdAt?: Date;

  rentalname?: string;
  clinic?: Clinic;
  bookings?: Booking[];
  user?: Report;
}
