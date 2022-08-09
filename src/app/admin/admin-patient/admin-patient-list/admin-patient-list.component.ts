import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Report } from 'src/app/auth/shared/report.model';
import { ModalWindow } from 'src/app/common/modal-window/modal-window';

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

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getPatients();
  }

  pageChange() {
    this.patients = [];
    this.getPatients();
  }

  getPatients() {
    this.adminService
      .getUsersByPages(this.pageIndex, this.pageSize)
      .subscribe((result: any) => {
        this.patients = result[0].foundUsers; // <- users
        this.pageCollectionSize = result[0].metadata[0].total;
      });
  }

  openModal(patient: any) {
    const dialogRef = this.modalService.open(ModalWindow);
    dialogRef.componentInstance.patient = patient;
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
    }).then((result) => {
      if (!result.dismiss) {
        this.deletePatient(patientId);
      }
    });
  }

  private deletePatient(patientId: any) {
    this.adminService.deleteUser(patientId).subscribe((success: any) => {
      const index = this.patients.findIndex((x: any) => x._id === patientId);
      this.patients.splice(index, 1); // Dlete event from array.
      Swal.fire({
        text: '削除しました',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-danger btn-lg',
        },
        buttonsStyling: false,
      });
    });
  }

  getUsersByKeywords(searchWords?: string) {
    if (!searchWords) {
      this.getPatients();
    } else {
      this.adminService
        .getUsersByKeywords(searchWords)
        .subscribe((patients: any) => {
          this.patients = patients; // <- users
        });
    }
  }
}
