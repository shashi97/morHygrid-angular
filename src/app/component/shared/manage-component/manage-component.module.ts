import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage-component.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ManageComponent
  ],
  providers: [
  ],
  exports: [
    ManageComponent
  ]
})

export class ManageModule { }
