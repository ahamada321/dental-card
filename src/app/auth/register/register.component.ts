import { Component, OnInit, Injectable } from '@angular/core';
import { MyOriginAuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AdminService } from "src/app/admin/service/admin.service";
// import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Report } from 'src/app/auth/shared/report.model';
import { Teacher } from 'src/app/auth/shared/teacher.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isClicked: boolean = false;
  errors: any = [];
  max = new Date(); // Restrict selecting range of birthday

  newReport = new Report();
  username!: string;
  email!: string;
  gender = {};
  birthDay!: Date;
  phoneNumber!: number;
  address!: string;
  covid = {};
  purpose = {};
  toothExtraction = {};

  // Select gender
  dropdownGenderList = [
    { id: 1, gender: '男性' },
    { id: 2, gender: '女性' },
  ];
  dropdownGenderSettings = {
    singleSelection: true,
    text: '性別を選択してください',
    labelKey: 'gender',
    enableSearchFilter: false,
    classes: '',
  };

  // Select COVID
  dropdownAnswerList = [
    { id: 1, answer: 'はい' },
    { id: 2, answer: 'いいえ' },
  ];
  dropdownAnswerSettings = {
    singleSelection: true,
    text: '回答を選択してください',
    labelKey: 'answer',
    enableSearchFilter: false,
    classes: '',
  };

  // Select purpose
  dropdownPurposeList = [
    { id: 1, purpose: '歯科検診を希望' },
    { id: 2, purpose: '詰め物が取れた' },
    { id: 3, purpose: '歯が痛い' },
    { id: 4, purpose: '歯肉が痛い' },
    { id: 5, purpose: '入れ歯を入れたい' },
    { id: 6, purpose: '歯並びが気になる' },
    { id: 7, purpose: 'その他' },
  ];
  dropdownPurposeSettings = {
    singleSelection: true,
    text: '来院目的を選択してください',
    labelKey: 'purpose',
    enableSearchFilter: false,
    classes: '',
  };

  // Select course
  dropdownCourseList = [
    { id: 1, itemName: '通常（60分/回）' },
    { id: 2, itemName: '一曲集中（初心者）' },
    { id: 3, itemName: '一曲集中（経験者）' },
    { id: 4, itemName: '子供（40分/回）' },
  ];
  dropdownCourseSettings = {
    singleSelection: true,
    text: 'コースを選択',
    enableSearchFilter: false,
    classes: '',
  };

  constructor(
    private auth: MyOriginAuthService,
    // private adminService: AdminService,
    // private calendar: NgbCalendar,
    private router: Router
  ) {}

  ngOnInit() {}

  onDateSelect(date: Date) {}

  // registerStudent(formData: NgForm) {
  //   this.isClicked = true;
  //   if (this.studentBirthday) {
  //     formData.value.birthday = {
  //       year: this.studentBirthday.getFullYear(),
  //       month: this.studentBirthday.getMonth() + 1,
  //       day: this.studentBirthday.getDate(),
  //     };
  //   }
  // }

  // registerTeacher(formData: NgForm) {
  //   this.isClicked = true;
  //   if (this.teacherBirthday) {
  //     formData.value.birthday = {
  //       year: this.teacherBirthday.getFullYear(),
  //       month: this.teacherBirthday.getMonth() + 1,
  //       day: this.teacherBirthday.getDate(),
  //     };
  //   }

  //   this.auth.register(formData.value).subscribe(
  //     (teacherId) => {
  //       Swal.fire({
  //         title: '講師アカウント発行完了',
  //         text: '講師IDは「tt' + teacherId + '」です',
  //         icon: 'success',
  //         allowOutsideClick: false,
  //       }).then(() => {
  //         formData.reset();
  //         this.isClicked = false;
  //         this.errors = [];
  //       });
  //     },
  //     (errorResponse: HttpErrorResponse) => {
  //       this.errors = errorResponse.error.errors;
  //       console.error(this.errors);
  //       this.showSwalError();
  //     }
  //   );
  // }

  register(formData: NgForm) {}

  aa() {
    console.log(this.newReport);
  }

  private showSwalError() {
    Swal.fire({
      title: '通信エラー',
      text: 'もう一度登録ボタンを押しなおしてください',
      icon: 'error',
    }).then(() => {
      this.isClicked = false;
    });
  }
}
