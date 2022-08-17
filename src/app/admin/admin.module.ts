import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// import { CsvModule } from "@ctrl/ngx-csv";
import { AuthGuard } from '../auth/shared/auth.guard';
import { AdminComponent } from './admin.component';
import { AdminReportsListComponent } from './admin-reports/admin-reports-list/admin-reports-list.component';
// import { AdminReportListTeacherComponent } from './admin-reports/admin-reports-list-teacher/admin-reports-list-teacher.component';
// import { AdminReportListStudentComponent } from './admin-reports/admin-reports-list-student/admin-reports-list-student.component';
// import { AdminRevenueListComponent } from './admin-revenue/admin-revenue-list/admin-revenue-list.component';
// import { AdminRevenueListTeacherComponent } from './admin-revenue/admin-revenue-list-teacher/admin-revenue-list-teacher.component';
import { AdminService } from './shared/admin.service';
import { AdminPatientsListComponent } from './admin-patients/admin-patients-list/admin-patients-list.component';
import { AdminPatientsEditComponent } from './admin-patients/admin-patients-edit/admin-patients-edit.component';
import { AdminBookingsListComponent } from './admin-bookings/admin-bookings-list/admin-bookings-list.component';
import { ModalWindowModule } from '../common/modal-window/modal-window.module';
import { SearchbarModule } from '../common/searchbar/searchbar.module';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'reports',
        component: AdminReportsListComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'reports/stutdent/:studentId',
      //   component: AdminReportListStudentComponent,
      //   canActivate: [AuthGuard],
      // },
      // {
      //   path: 'reports/teacher/:patientId',
      //   component: AdminReportListTeacherComponent,
      //   canActivate: [AuthGuard],
      // },

      // {
      //   path: 'revenue',
      //   component: AdminRevenueListComponent,
      //   canActivate: [AuthGuard],
      // },
      // {
      //   path: 'revenue/teacher/:patientId',
      //   component: AdminRevenueListTeacherComponent,
      //   canActivate: [AuthGuard],
      // },

      {
        path: 'bookings',
        component: AdminBookingsListComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'students/:studentId',
      //   component: AdminStudentEditComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'patients',
        component: AdminPatientsListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'patients/:patientId',
        component: AdminPatientsEditComponent,
        canActivate: [AuthGuard],
      },

      { path: '', redirectTo: 'patients', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminReportsListComponent,
    // AdminReportListTeacherComponent,
    // AdminReportListStudentComponent,
    // AdminRevenueListComponent,
    // AdminRevenueListTeacherComponent,
    AdminPatientsListComponent,
    AdminPatientsEditComponent,
    AdminBookingsListComponent,
    // AdminStudentEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    AngularMultiSelectModule,
    // CsvModule,
    ModalWindowModule,
    SearchbarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [AdminService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
