import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import * as moment from 'moment-timezone';
import Swal from 'sweetalert2';
import { Booking } from 'src/app/clinic/shared/booking.model';
import {
  CalendarOptions,
  defineFullCalendarElement,
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ClinicService } from 'src/app/clinic/shared/clinic.service';
import { Clinic } from 'src/app/clinic/shared/clinic.model';

// make the <full-calendar> element globally available by calling this function at the top-level
defineFullCalendarElement();

@Component({
  selector: 'app-admin-bookings-list',
  templateUrl: './admin-bookings-list.component.html',
  styleUrls: ['./admin-bookings-list.component.scss'],
})
export class AdminBookingsListComponent implements OnInit {
  bookings: Booking[] = [];
  pageIndex: number = 1;
  pageSize: number = 30; // Displaying contents per page.

  rentals: Clinic[] = [];
  events: any = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    // events: this.events,
    events: {
      start: new Date(),
      end: moment().add(30, 'minutes'),
    },
  };

  constructor(
    private adminService: AdminService, // private dialogService: MatDialog
    private clinicService: ClinicService
  ) {}

  ngOnInit() {
    this.getOwnerRentals();
  }

  private getOwnerRentals() {
    this.clinicService.getOwnerRentals(this.pageIndex, this.pageSize).subscribe(
      (foundRentals) => {
        this.rentals = foundRentals;
        // this.pageCollectionSize = result[0].metadata[0].total;
        this.initEvents();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private initEvents() {
    for (let rental of this.rentals) {
      for (let booking of rental.bookings!) {
        this.events.push({
          start: booking.startAt,
          end: moment(booking.startAt)
            .add(booking.courseTime, 'minutes')
            .subtract(1, 'minute'),
        });
      }
    }
  }

  onDelete(report: any) {
    // Swal.fire({
    //   title: "この操作は取り消せません",
    //   text: "この報告を削除します",
    //   type: "warning",
    //   confirmButtonClass: "btn btn-danger btn-lg",
    //   cancelButtonClass: "btn btn-gray btn-lg",
    //   confirmButtonText: "削除",
    //   cancelButtonText: "キャンセル",
    //   showCancelButton: true,
    //   buttonsStyling: false,
    // }).then((result) => {
    //   if (!result.dismiss) {
    //     this.deleteReport(report);
    //   }
    // });
  }

  private deleteReport(booking: any) {
    // this.adminService.deleteReport(booking._id).subscribe((success) => {
    //   const index = this.bookings.findIndex((x: any) => x._id === booking._id);
    //   this.bookings.splice(index, 1); // Dlete event from array.
    // });
  }

  openDialog(report: any) {
    // const dialogRef = this.dialogService.open(ReportDialog, {
    //   width: "600px",
    //   position: { top: "80px" },
    // });
    // dialogRef.componentInstance.report = report;
    // dialogRef.afterClosed().subscribe((result) => {});
  }

  convertCreatedAtJST(time: any) {
    return moment(time).tz('Asia/Tokyo').format('YYYY/MM/DD');
  }

  convertJST(time: any) {
    // Due to saved data is not UTC
    return moment(time)
      .subtract(9, 'hour')
      .tz('Asia/Tokyo')
      .format('YYYY/MM/DD');
  }
}
