// import { Report } from 'src/app/teacher/service/report.model';

export class Report {
  _id?: string;

  username!: string;
  email!: string;
  gender!: object;
  birthDay!: Date;
  phoneNumber!: number;
  address!: string;
  covid!: object;
  purpose!: object;
  toothExtraction!: object;
}
