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
  whenDidYouExtractTooth?: string;
  BleedingDidntStop?: boolean;
  HadPainForDays?: boolean;
  HadFever?: boolean;
  HadAnemia?: boolean;
  OtherTroubleAfterToothExtraction?: string;
  sideEffect?: string;
  GetStomach?: boolean;
  GetRash?: boolean;
  GetItchy?: boolean;
  allergic?: string;
  HaveRashEasily?: boolean;
  HaveUrticaria?: boolean;
  HaveAsthma?: boolean;
  OtherAllergic?: string;
  medicalIllness?: string;
  Heart?: boolean;
  Liver?: boolean;
  Kidney?: boolean;
  Hemophilia?: boolean;
  Diabetes?: boolean;
  HighBloodPressure?: boolean;
  LowBloodPressure?: boolean;
  Asthma?: boolean;
  Tuberculosis?: boolean;
  OtherMedicalIllness?: string;
  toothCleaningTimes?: number;
  request?: string;
  medicalInsurance?: string;
  condition?: string;
}
