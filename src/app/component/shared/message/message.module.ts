import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageSericeComponent } from '../message/messageService.component';
import { MessageService } from '../message/messageService.service'
import { SharedComponentModule } from '../shared-component.module';
@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule

  ],
  declarations: [
    MessageSericeComponent
  ],
  providers: [MessageService],
  exports: [
    MessageSericeComponent
  ]
})

export class MessageModule { }
