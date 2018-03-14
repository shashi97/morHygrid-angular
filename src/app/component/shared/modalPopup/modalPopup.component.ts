import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HfaDatabasCategoryModel } from '../../../../app/component/hfaDatabase/shared/hfadatabase.model';
import { MasterService } from '../../shared/service/master.service';
import { CategoryModel, CategoryListmodel } from '../../shared/model/category.model';
import { MessageService } from '../message/messageService.service'

declare const $;
@Component({
  selector: 'hy-modalpopup',
  templateUrl: './modalPopup.component.html',
  styleUrls: ['./modalPopup.component.css']
})
export class ModalPopupComponent implements OnInit {


  @Input() categoryList: Array<CategoryListmodel>;
  @Output() categoryListChange: EventEmitter<CategoryListmodel[]> = new EventEmitter();
  category: CategoryModel = new CategoryModel();
  constructor(private masterService: MasterService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }

  SaveCategory() {
    // this.categoryNameChange.emit(this.categoryName);
    if (this.category.CategoryName === undefined) {
      const message = { severity: 'error', summary: 'Error Message', detail: 'Invalid Category Name' }
      this.messageService.showMessage(message)
      this.getAllCategory();

    } else {
      this.masterService.saveCategoryDetail(this.category).then(res => {
        this.category.CategoryName = ''
        this.getAllCategory();
      })
    }

  }

  getAllCategory() {
    this.masterService.getAllCategoryList().then(category => {
      this.categoryList = category.data.Result;
      $('.closeButton').trigger('click');
      this.categoryListChange.emit(this.categoryList);
    })
  }

}
