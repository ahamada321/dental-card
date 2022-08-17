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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
  };

  // Select month
  dropdownMonthList = [
    { id: 1, itemName: moment().format('YYYY年 / MM月') },
    { id: 2, itemName: moment().subtract(1, 'month').format('YYYY年 / MM月') },
    { id: 3, itemName: moment().subtract(2, 'month').format('YYYY年 / MM月') },
    { id: 4, itemName: moment().subtract(3, 'month').format('YYYY年 / MM月') },
    { id: 5, itemName: moment().subtract(4, 'month').format('YYYY年 / MM月') },
    { id: 6, itemName: moment().subtract(5, 'month').format('YYYY年 / MM月') },
    { id: 7, itemName: moment().subtract(6, 'month').format('YYYY年 / MM月') },
    { id: 8, itemName: moment().subtract(7, 'month').format('YYYY年 / MM月') },
    { id: 9, itemName: moment().subtract(8, 'month').format('YYYY年 / MM月') },
    { id: 10, itemName: moment().subtract(9, 'month').format('YYYY年 / MM月') },
    {
      id: 11,
      itemName: moment().subtract(10, 'month').format('YYYY年 / MM月'),
    },
    {
      id: 12,
      itemName: moment().subtract(11, 'month').format('YYYY年 / MM月'),
    },
    {
      id: 13,
      itemName: moment().subtract(12, 'month').format('YYYY年 / MM月'),
    },
    {
      id: 14,
      itemName: moment().subtract(13, 'month').format('YYYY年 / MM月'),
    },
    {
      id: 15,
      itemName: moment().subtract(14, 'month').format('YYYY年 / MM月'),
    },
  ];
  selectedItems = [{ id: 1, itemName: moment().format('YYYY年 / MM月') }];
  dropdownMonthSettings = {
    singleSelection: true,
    text: '月を選択',
    enableSearchFilter: false,
    classes: '',
  };

  constructor(
    private adminService: AdminService // private dialogService: MatDialog
  ) {}

  ngOnInit() {
    this.getReports(this.selectedItems[0].id);
  }

  private getReports(selectedMonth: any) {
    this.adminService.getReports(selectedMonth).subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  onItemSelect(selectedItem: any) {
    this.bookings = [];
    this.getReports(selectedItem.id);
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
