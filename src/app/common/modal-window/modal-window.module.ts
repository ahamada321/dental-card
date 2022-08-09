import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../matmodule/matmodule';
import { ModalWindow } from './modal-window';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule],
  declarations: [ModalWindow],
  exports: [ModalWindow],
  entryComponents: [ModalWindow],
  providers: [],
})
export class ModalWindowModule {}
