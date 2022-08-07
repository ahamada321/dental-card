import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/admin.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Report } from 'src/app/auth/shared/report.model';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-admin-patient-edit',
  templateUrl: './admin-patient-edit.component.html',
  styleUrls: ['./admin-patient-edit.component.scss'],
})
export class AdminPatientEditComponent implements OnInit {
  errors: any = [];
  teacherData!: Report;

  // Restrict selecting range of birthday
  max = new Date();
  teacherBirthday!: Date;

  // Select gender
  dropdownGenderList = [
    { id: 1, itemName: '男性' },
    { id: 2, itemName: '女性' },
  ];
  dropdownGenderSettings = {
    singleSelection: true,
    text: '性別を選択',
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

  constructor(
    private route: ActivatedRoute,
    private auth: MyOriginAuthService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getTeacherById(params['teacherId']);
    });
  }

  getTeacherById(teacherId: string) {
    this.adminService.getTeacherById(teacherId).subscribe(
      (foundTeacher) => {
        this.teacherData = foundTeacher;
        // this.teacherBirthday = new Date(
        //   foundTeacher.birthday.year,
        //   foundTeacher.birthday.month - 1,
        //   foundTeacher.birthday.day
        // );
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  updateTeacher(teacherForm: NgForm) {
    // if (this.teacherBirthday) {
    //   teacherForm.value.birthday = {
    //     year: this.teacherBirthday.getFullYear(),
    //     month: this.teacherBirthday.getMonth() + 1,
    //     day: this.teacherBirthday.getDate(),
    //   };
    // }
    this.auth.updateUser(this.teacherData._id, teacherForm.value).subscribe(
      (Updated: any) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.showSwalError();
        this.errors = errorResponse.error.errors;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      // title: 'User infomation has been updated!',
      text: '更新しました！',
      // type: 'success',
      customClass: {
        confirmButton: 'btn btn-primary btn-round btn-lg',
      },
      buttonsStyling: false,
      // timer: 5000
    }).then(() => {
      this.router.navigate(['/admin/teachers']);
    });
  }

  private showSwalError() {
    Swal.fire({
      title: '通信エラー',
      text: 'もう一度更新ボタンを押しなおしてください',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger btn-round btn-lg',
      },
      buttonsStyling: false,
    });
  }

  onResetPassword() {
    Swal.fire({
      title: 'この操作は取り消せません',
      text: 'パスワードを「tsubaki」に初期化します',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f5593d',
      cancelButtonColor: '#9A9A9A',
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.dismiss) {
        this.setInitialPassword();
      }
    });
  }

  private setInitialPassword() {
    this.auth.setInitialPassword(this.teacherData._id).subscribe(
      () => {
        Swal.fire({
          // title: 'この操作は取り消せません',
          text: 'パスワードを「tsubaki」に初期化しました',
          customClass: {
            confirmButton: 'btn btn-danger btn-round btn-lg',
          },
          buttonsStyling: false,
          // timer: 5000
        });
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
