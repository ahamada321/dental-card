import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { DateTimeAdapter } from 'ng-pick-datetime';
import { MatStepper } from '@angular/material/stepper';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { BookingService } from './shared/booking.service';

import { Clinic } from '../shared/clinic.model';
import { Booking } from './shared/booking.model';
import * as moment from 'moment-timezone';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clinic-booking',
  templateUrl: './clinic-booking.component.html',
  styleUrls: ['./clinic-booking.component.scss'],
})
export class ClinicBookingComponent implements OnInit {
  // Focus and change border line color
  focus!: boolean;
  focus1!: boolean;
  focus2!: boolean;
  focus3!: boolean;
  focus4!: boolean;
  focus5!: boolean;

  isSelectedCourseType: boolean = false;
  isSelectedDateTime: boolean = false;

  timeTables: any = [];
  newBooking!: Booking;
  bookingForm!: FormGroup;
  isDateBlock_flg: boolean = false;
  isClicked: boolean = false;
  errors: any[] = [];

  courseType!: String;
  // Date picker params
  selectedDate!: Date;
  minDate = new Date();

  @Input() clinic!: Clinic;
  @Input() selectedCourseTime: number = 60;
  @Output() newBookingInfo = new EventEmitter();

  constructor(
    public auth: MyOriginAuthService,
    private router: Router,
    private bookingService: BookingService //  private dateTimeAdapter: DateTimeAdapter<any>
  ) {
    // Initiate Datepicker
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    // this.onDateSelect(this.selectedDate);
    this.newBooking = new Booking();
  }

  onCourseSelected(courseType: String, stepper: MatStepper) {
    this.courseType = courseType;
    this.isSelectedCourseType = true;
    stepper.next();
  }

  onDateSelect(date: Date) {
    const selectedDay = date.getDay();
    let mTimeTables = [];
    let mEndAt = null;
    let mStartAt = null;

    mEndAt = moment({ hour: 20, minute: 30 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
    mStartAt = moment({ hour: 9, minute: 0 }).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });

    while (mStartAt < mEndAt) {
      mTimeTables.push(moment(mStartAt));
      mStartAt.add(30, 'minutes');
    }
    this.timeTables = mTimeTables;
  }

  isValidBooking(startAt: Date) {
    return true;
  }

  selectDateTime(startAt: Date, stepper: MatStepper) {
    this.isSelectedDateTime = true;
    // this.bookingForm.patchValue({
    //   bookingDate: moment(startAt).set({
    //     year: this.selectedDate.getFullYear(),
    //     month: this.selectedDate.getMonth(),
    //     date: this.selectedDate.getDate(),
    //   }),
    // });
    this.isClicked = false;
    // stepper.next();
    Swal.fire({
      html: `<h5>予約日時</h5>${startAt}<br><br><h5>内容</h5>${this.courseType}<br><br>で予約しますか？`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
      allowOutsideClick: false,
    }).then(() => {
      // this.router.navigate(['/'])
      this.showSwalSuccess(); // tmp
    });
  }

  isInvalidForm(fieldname: string): boolean {
    return (
      this.bookingForm.controls[fieldname].invalid &&
      this.bookingForm.controls[fieldname].touched
    );
    //  (this.contactForm.controls[fieldname].dirty ||
    //  this.contactForm.controls[fieldname].touched)
  }

  createBooking(bookingForm: FormGroup) {
    this.isClicked = true;
    if (!bookingForm.value.bookingDate) {
      this.errors = [{ detail: '予約日時が選択されてません！' }];
      return;
    }
    this.bookingService.createBooking(bookingForm.value).subscribe(
      (Message) => {
        bookingForm.reset();
        // this.modalRef.close();
        this.isClicked = false;
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
        this.isClicked = false;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      title: '予約完了しました！',
      text: '当日のご来院をお待ちしております',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary btn-round btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/clinic']);
    });
  }
}
