export class Teacher {
  _id?: string;
  isVerified?: boolean;

  username?: string;
  birthday?: object;
  gender?: string;
  selectedGender?: any[];
  selectedInstrument?: any[];

  email?: string;
  password?: string;
  confirmPassword?: string;

  tel?: string;
  postalcode?: string;
  selectedPrefecture?: any[];
  city?: string;
  address?: string;
  nearStation?: string;

  school?: string;
  major?: string;
  appeal?: string;
  hourlyPrice?: number;
  instrumentRental?: string;
  lineGroup?: string;
  homepage?: string;
  career?: string;
  photo?: string;

  bankName?: string;
  bankBranchName?: string;
  bankAccountType?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;

  // rentals: any <- students
  // bookings: any <- reports

  // teacher: any
  // student: any

  // comment: string
  // totalPrice: number

  // startAt: Date
  // createdAt: Date
}
