import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './category.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { CategoryComponent} from './category.component'
import {CategoryService} from './shared/category.service'
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule

  ],
  declarations: [
    CategoryComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    CategoryService
  ]
})

export class CategoryModule { }
