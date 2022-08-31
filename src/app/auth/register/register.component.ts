import { Component, OnInit, Injectable } from '@angular/core';
import { MyOriginAuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Report } from 'src/app/auth/shared/report.model';
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

  // Select gender
  dropdownGenderLists = [
    { id: 1, gender: '男性' },
    { id: 2, gender: '女性' },
  ];

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

  dropdownAnswerLists = [
    { id: 1, answer: 'はい' },
    { id: 2, answer: 'いいえ' },
  ];

  dropdownPurposeLists = [
    { id: 1, purpose: '歯科検診を希望' },
    { id: 2, purpose: '詰め物が取れた' },
    { id: 3, purpose: '歯が痛い' },
    { id: 4, purpose: '歯肉が痛い' },
    { id: 5, purpose: '入れ歯を入れたい' },
    { id: 6, purpose: '歯並びが気になる' },
    { id: 7, purpose: 'その他' },
  ];

  dropdownRequestLists = [
    { id: 1, request: '悪いところは全て治したい' },
    { id: 2, request: '痛いところのみ治療したい' },
  ];

  dropdownMedicalInsuranceLists = [
    { id: 1, medicalInsurance: '保険の範囲内で治療したい' },
    { id: 2, medicalInsurance: '保険のきかない所は自費でもいい' },
  ];

  dropdownConditionLists = [
    { id: 1, condition: '良好' },
    { id: 2, condition: '普通' },
    { id: 3, condition: '不良' },
    { id: 4, condition: '女性の方：生理中' },
    { id: 5, condition: '女性の方：妊娠中' },
  ];

  constructor(private auth: MyOriginAuthService, private router: Router) {}

  ngOnInit() {
    this.newReport.birthday = new Date(1990, 5, 1); // Initialize birthday.
  }

  register(formData: NgForm) {
    this.isClicked = true;

    this.auth.register(formData.value).subscribe(
      (newUser: any) => {
        Swal.fire({
          title: '登録完了',
          text: '受付にお伝えください',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary btn-lg',
          },
          buttonsStyling: false,
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
      text: 'もう一度登録ボタンを押してください',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
      allowOutsideClick: false,
    }).then(() => {
      this.isClicked = false;
    });
  }
}
