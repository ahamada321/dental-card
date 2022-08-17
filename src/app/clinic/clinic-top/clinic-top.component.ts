import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { ClinicService } from '../shared/clinic.service';
import { BookingService } from '../shared/booking.service';
import { Booking } from '../shared/booking.model';
import { Clinic } from '../shared/clinic.model';
import * as moment from 'moment';

@Component({
  selector: 'app-clinic-top',
  templateUrl: './clinic-top.component.html',
  styleUrls: ['./clinic-top.component.scss'],
})
export class ClinicTopComponent implements OnInit {
  foundBookings: Booking[] = [];
  clinic!: Clinic;

  constructor(
    public auth: MyOriginAuthService,
    private clinicService: ClinicService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.getUserBookings();
    this.getClinic('5fcf5214db4b798effe54805');
  }

  getUserBookings() {
    this.bookingService.getUserBookings().subscribe(
      (foundBookings) => {
        this.foundBookings = foundBookings;
      },
      (errorResponse) => {}
    );
  }

  getClinic(rentalId: string) {
    this.clinicService.getRentalById(rentalId).subscribe((clinic: Clinic) => {
      this.clinic = clinic;
      // this.getAvgRating(rental._id)
      // this.getReviews(rental._id);
      // this.getSafeUrl(rental.course1Img);
    });
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

          const index = this.foundBookings.findIndex(
            (x) => x._id === this.foundBookings[0]._id
          );
          this.foundBookings.splice(index, 1);
        },
        (errorResponse) => {}
      );
    }
  }

  isExpired() {
    const timeNow = moment(); // Attention: just "moment()" is already applied timezone!
    return moment(this.foundBookings[0].startAt).diff(timeNow) < 0;
  }
}
