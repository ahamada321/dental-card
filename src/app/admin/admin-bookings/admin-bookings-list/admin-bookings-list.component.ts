import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import * as moment from 'moment-timezone';
import Swal from 'sweetalert2';
import { Booking } from 'src/app/clinic/shared/booking.model';
import {
  CalendarOptions,
  defineFullCalendarElement,
} from '@fullcalendar/web-component';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
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
  resources: any = [];

  calendarOptions: CalendarOptions = {
    // timeZone: 'JST',
    // schedulerLicenseKey: 'XXX',
    plugins: [resourceTimelinePlugin, dayGridPlugin],
    initialView: 'resourceTimelineDay',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek,dayGridMonth',
    },
    nowIndicator: true,
    // events: [{
    //   "start": new Date("2022-08-22T12:00:00Z"),  // will NOT parse into object
    //   "end": new Date("2022-08-22T13:00:00Z")
    // }],
    resourceAreaHeaderContent: 'Units',
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

  private initResources() {
    this.calendarOptions = {
      ...this.calendarOptions,
      resources: this.resources,

    }
  }

  private initEvents() {
    for (let rental of this.rentals) {
      this.resources.push({ id: rental._id, title: rental.rentalname })
      for (let booking of rental.bookings!) {
        if(booking.startAt){
          let date = new Date(booking.startAt);
          this.events.push({
            start: new Date(booking.startAt),
            end: new Date(date.setMinutes(date.getMinutes() + 30 - 1)),
            title: booking.courseType,
            resourceId: rental._id
          });
        }
      }
    }
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events,
      resources: this.resources
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
