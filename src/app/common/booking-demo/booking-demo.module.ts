import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDemoComponent } from './booking-demo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../matmodule/matmodule';
import { BookingSelecterModule } from '../booking-selecter/booking-selecter.module';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

@NgModule({
  declarations: [BookingDemoComponent],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BookingSelecterModule,
  ],
  exports: [BookingDemoComponent],
  entryComponents: [BookingDemoComponent],
  providers: [],
})
export class BookingDemoModule {}
