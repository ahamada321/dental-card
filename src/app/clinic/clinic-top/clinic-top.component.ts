import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as moment from 'moment-timezone';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ClinicService } from '../shared/clinic.service';
import { BookingService } from '../clinic-booking/shared/booking.service';
import { Booking } from '../clinic-booking/shared/booking.model';

@Component({
  selector: 'app-clinic-top',
  templateUrl: './clinic-top.component.html',
  styleUrls: ['./clinic-top.component.scss'],
})
export class ClinicTopComponent implements OnInit {
  foundBookings: Booking[] = [];

  constructor(
    public auth: MyOriginAuthService,
    private clinicService: ClinicService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.getUserBookings();
  }

  getUserBookings() {
    this.bookingService.getUserBookings().subscribe(
      (foundBookings) => {
        this.foundBookings = foundBookings;
      },
      (errorResponse) => {}
    );
  }

  deleteConfirmation() {
    Swal.fire({
      title: '予約をキャンセルしますか?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f5593d',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.deleteBooking();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  private deleteBooking() {
    if (this.foundBookings[0]._id) {
      this.bookingService.deleteBooking(this.foundBookings[0]._id).subscribe(
        (deletedBooking) => {
          Swal.fire({
            title: '予約キャンセルされました',
            icon: 'info',
            customClass: {
              confirmButton: 'btn btn-primary btn-round btn-lg',
            },
            buttonsStyling: false,
            allowOutsideClick: false,
          });
        },
        (errorResponse) => {}
      );
    }
  }
}
