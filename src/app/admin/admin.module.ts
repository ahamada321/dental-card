import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// import { CsvModule } from "@ctrl/ngx-csv";
import { AuthGuard } from '../auth/shared/auth.guard';
import { AdminComponent } from './admin.component';
import { AdminReportListComponent } from './admin-report/admin-report-list/admin-report-list.component';
// import { AdminReportListTeacherComponent } from './admin-report/admin-report-list-teacher/admin-report-list-teacher.component';
// import { AdminReportListStudentComponent } from './admin-report/admin-report-list-student/admin-report-list-student.component';
// import { AdminRevenueListComponent } from './admin-revenue/admin-revenue-list/admin-revenue-list.component';
// import { AdminRevenueListTeacherComponent } from './admin-revenue/admin-revenue-list-teacher/admin-revenue-list-teacher.component';
import { AdminService } from './shared/admin.service';
import { AdminPatientListComponent } from './admin-patient/admin-patient-list/admin-patient-list.component';
import { AdminPatientEditComponent } from './admin-patient/admin-patient-edit/admin-patient-edit.component';
// import { TeacherService } from "../teacher/service/teacher.service";
// import { ReportDialogModule } from "../common/components/report-dialog/report-dialog.module";
// import { SearchbarModule } from "../common/components/searchbar/searchbar.module";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'reports',
        component: AdminReportListComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'reports/stutdent/:studentId',
      //   component: AdminReportListStudentComponent,
      //   canActivate: [AuthGuard],
      // },
      // {
      //   path: 'reports/teacher/:teacherId',
      //   component: AdminReportListTeacherComponent,
      //   canActivate: [AuthGuard],
      // },

      // {
      //   path: 'revenue',
      //   component: AdminRevenueListComponent,
      //   canActivate: [AuthGuard],
      // },
      // {
      //   path: 'revenue/teacher/:teacherId',
      //   component: AdminRevenueListTeacherComponent,
      //   canActivate: [AuthGuard],
      // },

      // {
      //   path: 'students',
      //   component: AdminStudentListComponent,
      //   canActivate: [AuthGuard],
      // },
      // {
      //   path: 'students/:studentId',
      //   component: AdminStudentEditComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'patients',
        component: AdminPatientListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'patients/:teacherId',
        component: AdminPatientEditComponent,
        canActivate: [AuthGuard],
      },

      { path: '', redirectTo: 'patients', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminReportListComponent,
    // AdminReportListTeacherComponent,
    // AdminReportListStudentComponent,
    // AdminRevenueListComponent,
    // AdminRevenueListTeacherComponent,
    AdminPatientListComponent,
    AdminPatientEditComponent,
    // AdminStudentListComponent,
    // AdminStudentEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    // NgbModule,
    JwBootstrapSwitchNg2Module,
    AngularMultiSelectModule,
    // CsvModule,
    // ReportDialogModule,
    // SearchbarModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [AdminService],
})
export class AdminModule {}
