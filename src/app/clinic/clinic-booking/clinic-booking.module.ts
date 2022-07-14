import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicBookingComponent } from './clinic-booking.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from './shared/booking.service';

@NgModule({
  declarations: [ClinicBookingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    // NgbModule,
  ],
  exports: [ClinicBookingComponent],
  providers: [BookingService],
})
export class ClinicBookingModule {}
