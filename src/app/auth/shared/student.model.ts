// import { Report } from 'src/app/teacher/service/report.model';

export class Student {
  _id?: string;
  shared?: boolean;
  teacherId?: number;

  rentalname?: string;
  birthday?: object;
  gender?: string;
  selectedGender?: any[];
  selectedInstrument?: any[];
  tel?: string;
  email?: string;
  postalcode?: string;
  selectedPrefecture?: any[];
  city?: string;
  address?: string;
  instrument?: string;
  place?: string;
  perMonth?: number;
  memo?: string;
  pic?: string;

  selectedCourse?: any[];

  bookings?: any[]; // Reports of this student
  user: any;

  // studentId: number
  // createdAt: Date
  // lastLesson: Date
  // rating: Number
}
