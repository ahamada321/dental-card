import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.html',
  styleUrls: ['./modal-window.scss'],
})
export class ModalWindow implements OnInit {
  @Input() profile: any;

  constructor(private dialogService: MatDialog) {}

  ngOnInit() {}
}
