import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/auth/shared/report.model';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.html',
  styleUrls: ['./modal-window.scss'],
})
export class ModalWindow implements OnInit {
  @Input() patient!: Report;

  constructor(
    private dialogService: MatDialog,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}
}
