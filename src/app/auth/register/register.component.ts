import { Component, OnInit, Injectable } from '@angular/core';
import { MyOriginAuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AdminService } from "src/app/admin/service/admin.service";
// import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Student } from 'src/app/auth/shared/student.model';
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
  newTeacher = new Teacher();
  newStudent = new Student();

  focus!: boolean;
  focus1!: boolean;
  focus2!: boolean;
  focus3!: boolean;

  // Restrict selecting range of birthday
  max = new Date();
  studentBirthday!: Date;
  teacherBirthday!: Date;

  // Select gender
  dropdownGenderList = [
    { id: 1, gender: '男性' },
    { id: 2, gender: '女性' },
  ];
  dropdownGenderSettings = {
    singleSelection: true,
    text: '性別を選択',
    labelKey: 'gender',
    enableSearchFilter: false,
    classes: '',
  };

  // Select prefecture
  dropdownPrefectureList = [
    { id: 1, itemName: '北海道' },
    { id: 2, itemName: '青森県' },
    { id: 3, itemName: '岩手県' },
    { id: 4, itemName: '宮城県' },
    { id: 5, itemName: '秋田県' },
    { id: 6, itemName: '山形県' },
    { id: 7, itemName: '福岡県' },
    { id: 8, itemName: '茨城県' },
    { id: 9, itemName: '栃木県' },
    { id: 10, itemName: '群馬県' },
    { id: 11, itemName: '埼玉県' },
    { id: 12, itemName: '千葉県' },
    { id: 13, itemName: '東京都' },
    { id: 14, itemName: '神奈川県' },
    { id: 15, itemName: '新潟県' },
    { id: 16, itemName: '富山県' },
    { id: 17, itemName: '石川県' },
    { id: 18, itemName: '福井県' },
    { id: 19, itemName: '山梨県' },
    { id: 20, itemName: '長野県' },
    { id: 21, itemName: '岐阜県' },
    { id: 22, itemName: '静岡県' },
    { id: 23, itemName: '愛知県' },
    { id: 24, itemName: '三重県' },
    { id: 25, itemName: '滋賀県' },
    { id: 26, itemName: '京都府' },
    { id: 27, itemName: '大阪府' },
    { id: 28, itemName: '兵庫県' },
    { id: 29, itemName: '奈良県' },
    { id: 30, itemName: '和歌山県' },
    { id: 31, itemName: '鳥取県' },
    { id: 32, itemName: '鳥根県' },
    { id: 33, itemName: '岡山県' },
    { id: 34, itemName: '広島県' },
    { id: 35, itemName: '山口県' },
    { id: 36, itemName: '徳島県' },
    { id: 37, itemName: '香川県' },
    { id: 38, itemName: '愛媛県' },
    { id: 39, itemName: '高知県' },
    { id: 40, itemName: '福岡県' },
    { id: 41, itemName: '佐賀県' },
    { id: 42, itemName: '長崎県' },
    { id: 43, itemName: '熊本県' },
    { id: 44, itemName: '大分県' },
    { id: 45, itemName: '宮崎県' },
    { id: 46, itemName: '鹿児島県' },
    { id: 47, itemName: '沖縄県' },
  ];
  dropdownPrefectureSettings = {
    singleSelection: true,
    text: '都道府県を選択',
    enableSearchFilter: true,
    searchPlaceholderText: 'キーワード検索',
    filterSelectAllText: '検索結果一覧',
    filterUnSelectAllText: '検索結果一覧',
    noDataLabel: '検索結果無し',
    // primaryKey: "id",
    // labelKey: "itemName",
    classes: '',
  };

  // Select instrument
  dropdownInstrumentList = [
    { id: 1, itemName: 'ピアノ' },
    { id: 2, itemName: '声楽' },
    { id: 3, itemName: 'ボーカル' },
    { id: 4, itemName: 'ヴァイオリン' },
    { id: 5, itemName: 'ヴィオラ' },
    { id: 6, itemName: 'チェロ' },
    { id: 7, itemName: 'コントラバス' },
    { id: 8, itemName: 'フルート' },
    { id: 9, itemName: 'サックス' },
    { id: 10, itemName: 'クラリネット' },
    { id: 11, itemName: 'オーボエ' },
    { id: 12, itemName: 'トランペット' },
    { id: 13, itemName: 'トロンボーン' },
    { id: 14, itemName: 'アコースティックギター' },
    { id: 15, itemName: 'エレキギター' },
    { id: 16, itemName: 'エレキベース' },
    { id: 17, itemName: 'ドラム' },
    { id: 18, itemName: 'DTM' },
    { id: 19, itemName: 'ソルフェージュ・楽典' },
    // { id: 20, itemName: "和楽器" },
    { id: 22, itemName: 'ウクレレ' },
    { id: 23, itemName: '三味線' },
    { id: 24, itemName: '琴' },
    { id: 25, itemName: 'ファゴット' },
    { id: 26, itemName: 'チューバ' },
    { id: 27, itemName: 'ホルン' },
    { id: 28, itemName: 'ユーフォニアム' },
    { id: 21, itemName: 'それ以外' },
  ];
  dropdownInstrumentSettings = {
    singleSelection: true,
    text: '楽器を選択',
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

  registerStudent(formData: NgForm) {
    this.isClicked = true;
    if (this.studentBirthday) {
      formData.value.birthday = {
        year: this.studentBirthday.getFullYear(),
        month: this.studentBirthday.getMonth() + 1,
        day: this.studentBirthday.getDate(),
      };
    }
  }

  registerTeacher(formData: NgForm) {
    this.isClicked = true;
    if (this.teacherBirthday) {
      formData.value.birthday = {
        year: this.teacherBirthday.getFullYear(),
        month: this.teacherBirthday.getMonth() + 1,
        day: this.teacherBirthday.getDate(),
      };
    }

    this.auth.register(formData.value).subscribe(
      (teacherId) => {
        Swal.fire({
          title: '講師アカウント発行完了',
          text: '講師IDは「tt' + teacherId + '」です',
          icon: 'success',
          allowOutsideClick: false,
        }).then(() => {
          formData.reset();
          this.isClicked = false;
          this.errors = [];
        });
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
        console.error(this.errors);
        this.showSwalError();
      }
    );
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
