import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
})
export class ClinicComponent implements OnInit {
  constructor(public auth: MyOriginAuthService) {}

  ngOnInit() {}
}
