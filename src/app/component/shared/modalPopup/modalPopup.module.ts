import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPopupComponent } from './modalPopup.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ModalPopupComponent
  ],
  providers: [
  ],
  exports: [
    ModalPopupComponent
  ]
})

export class ModalPopupModule { }
