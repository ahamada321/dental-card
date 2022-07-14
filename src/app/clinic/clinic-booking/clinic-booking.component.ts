import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { DateTimeAdapter } from 'ng-pick-datetime';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { BookingService } from './shared/booking.service';
import { Clinic } from '../shared/clinic.model';
import { Booking } from './shared/booking.model';
import * as moment from 'moment-timezone';

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

  timeTables: any = [];
  newBooking!: Booking;
  isDateBlock_flg: boolean = false;
  isClicked: boolean = false;
  errors: any[] = [];

  // Date picker params
  selectedDate = new Date();
  minDate = new Date();
  maxDate = new Date();

  @Input() clinic!: Clinic;
  @Input() selectedCourseTime: number = 60;
  @Output() newBookingInfo = new EventEmitter();

  constructor(
    public auth: MyOriginAuthService,
    private bookingService: BookingService // private dateTimeAdapter: DateTimeAdapter<any>
  ) {
    // Initiate Datepicker
    // dateTimeAdapter.setLocale('ja-JP');
    this.selectedDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 8); // Enables to post before 6 days.
    this.maxDate = new Date(
      this.maxDate.getFullYear(),
      this.maxDate.getMonth(),
      this.maxDate.getDate()
    ); // Convert to date format
  }

  ngOnInit() {
    // this.onDateSelect(this.selectedDate);
    this.newBooking = new Booking();
  }

  createBooking(bookingForm: NgForm) {}
}
