// import { Report } from 'src/app/teacher/service/report.model';

export class Report {
  _id!: string;
  createdAt?: Date;
  isVerified?: boolean; //wanna delete

  username?: string;
  email?: string;
  gender?: string;
  birthday?: Date;
  phoneNumber?: string;
  // prefecture?: string;
  address?: string;
  covid?: string;
  purpose?: string;
  purposeDetail?: string;
  toothExtraction?: string;
  sideEffect?: string;
  allergic?: string;
  medicalIllness?: string;
  toothCleaningTimes?: number;
  request?: string;
  medicalInsurance?: string;
  condition?: string;
}
