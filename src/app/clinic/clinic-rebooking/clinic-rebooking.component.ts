import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { DateTimeAdapter } from 'ng-pick-datetime';
import { MatStepper } from '@angular/material/stepper';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { BookingService } from '../shared/booking.service';
import { Booking } from '../shared/booking.model';
import { Clinic } from '../shared/clinic.model';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-clinic-rebooking',
  templateUrl: './clinic-rebooking.component.html',
  styleUrls: ['./clinic-rebooking.component.scss'],
})
export class ClinicRebookingComponent implements OnInit {
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
  currentBooking!: Booking;
  isDateBlock_flg: boolean = false;
  isClicked: boolean = false;
  errors: any[] = [];

  // Date picker params
  selectedDate!: Date;
  minDate = new Date();

  @Input() clinic!: Clinic;
  @Input() selectedCourseTime: number = 60;
  @Output() newBookingInfo = new EventEmitter();

  constructor(
    public auth: MyOriginAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService //  private dateTimeAdapter: DateTimeAdapter<any>
  ) {
    // Initiate Datepicker
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    // this.onDateSelect(this.selectedDate);
    this.route.params.subscribe((params) => {
      this.getBooking(params['bookingId']);
    });
  }

  private getBooking(bookingId: string) {
    this.bookingService
      .getBookingById(bookingId)
      .subscribe((booking: Booking) => {
        this.currentBooking = booking;
      });
  }

  isExpired() {
    const timeNow = moment(); // Attention: just "moment()" is already applied timezone!
    return moment(this.currentBooking.startAt).diff(timeNow) < 0;
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
    this.isClicked = false;
    this.currentBooking.oldStartAt = this.currentBooking.startAt;
    this.currentBooking.startAt = startAt;

    Swal.fire({
      html: `<h5>診療内容</h5>
          ${this.currentBooking.courseType}
          <br><br>
          <h5>変更後の予約日時</h5>
          ${moment(startAt).format('YYYY/MM/DD/HH:mm')}スタート
          <br><br>
          に変更しますか？`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#51cbce',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.updateBooking();
      }
    });
  }

  updateBooking() {
    this.isClicked = true;
    this.bookingService.updateBooking(this.currentBooking).subscribe(
      (Message) => {
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
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/clinic']);
    });
  }
}
