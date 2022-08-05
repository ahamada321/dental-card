import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import Swal from 'sweetalert2';
import { Report } from 'src/app/auth/shared/report.model';

@Component({
  selector: 'app-admin-patient-list',
  templateUrl: './admin-patient-list.component.html',
  // styleUrls: ['./admin-patient-list.component.scss']
})
export class AdminPatientListComponent implements OnInit {
  patients: Report[] = [];
  pageIndex: number = 1;
  pageSize: number = 50; // Displaying contents per page.
  pageCollectionSize: number = 1;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getPatients();
  }

  pageChange() {
    this.patients = [];
    this.getPatients();
  }

  getPatients() {
    this.adminService
      .getTeachersByPages(this.pageIndex, this.pageSize)
      .subscribe((result) => {
        this.patients = result[0].foundUsers; // <- users
        debugger;
        this.pageCollectionSize = result[0].metadata[0].total;
      });
  }

  onDelete(patientId: any) {
    Swal.fire({
      title: 'この操作は取り消せません',
      text: 'このデータを削除します',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f5593d',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: '削除',
      cancelButtonText: 'キャンセル',
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.deletePatient(patientId);
      }
    });
  }

  private deletePatient(patientId: any) {
    this.adminService.deleteTeacher(patientId).subscribe((success) => {
      const index = this.patients.findIndex((x: any) => x._id === patientId);
      this.patients.splice(index, 1); // Dlete event from array.
      Swal.fire({
        text: '削除しました',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-danger btn-round btn-lg',
        },
        buttonsStyling: false,
        allowOutsideClick: false,
      });
    });
  }

  getTeachersByKeywords(searchWords?: string) {
    if (!searchWords) {
      this.getPatients();
    } else {
      this.adminService
        .getTeachersByKeywords(searchWords)
        .subscribe((patients) => {
          this.patients = patients; // <- users
        });
    }
  }
}
