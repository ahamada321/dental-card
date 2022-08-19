import { Report } from 'src/app/auth/shared/report.model';
import { Booking } from './booking.model';
export class Clinic {
  length?: any;
  createdAt?: Date;

  clinicname?: string;
  clinic?: Clinic;
  bookings?: Booking[];
  user?: Report;
}
