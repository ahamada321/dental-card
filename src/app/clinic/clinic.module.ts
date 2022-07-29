import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthGuard } from '../auth/shared/auth.guard';

import { ClinicComponent } from './clinic.component';
import { ClinicTopComponent } from './clinic-top/clinic-top.component';
import { ClinicBookingComponent } from './clinic-booking/clinic-booking.component';
import { ClinicService } from './shared/clinic.service';
import { BookingService } from './clinic-booking/shared/booking.service';
import { MatStepperModule } from '@angular/material/stepper';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

const routes: Routes = [
  {
    path: 'clinic',
    component: ClinicComponent,
    children: [
      {
        path: '',
        component: ClinicTopComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'booking/:bookingId',
        component: ClinicBookingComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'booking',
        component: ClinicBookingComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [ClinicComponent, ClinicTopComponent, ClinicBookingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    SweetAlert2Module,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatStepperModule,
  ],
  providers: [ClinicService, BookingService],
})
export class ClinicModule {}
