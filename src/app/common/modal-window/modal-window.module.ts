import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../matmodule/matmodule';
import { ModalWindow } from './modal-window';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ModalWindow],
  exports: [ModalWindow],
  entryComponents: [ModalWindow],
  providers: [],
})
export class ModalWindowModule {}
