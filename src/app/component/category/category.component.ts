import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from './shared/category.module';
import { CategoryService } from './shared/category.service';
import { NotificationService } from '../../shared/utils/notification.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';

declare const $;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  totalDB: number;
  moduleName = 'Categories';
  addFunctionName = 'category';
  faIcon = 'fa fa-database fa-fw';
  data: string;
  allCategories: Array<CategoryModel> = [];
  msgs: Message[] = [];
  hfaCategoryDetail: CategoryModel = new CategoryModel();
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public categoryService: CategoryService,
    public notificationService: NotificationService,
    public messageService: MessageService

  ) {
  }

  ngOnInit() {
    this.getCategoriesDetails();
  }

  getCategoriesDetails(): void {
    this.categoryService.getCategoriesDetails().then(result => {
      this.allCategories = result.data.Result;
      this.totalDB = result.data.Result.length;
      $('.closeButton').trigger('click');
    })
  }

  deleteCategory(row) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete Category - <span class='txt-color-orangeDark'><strong>" + row.CategoryName + $('#show-shortcut').text() + "</strong></span> ?",
      content: 'Are you sure you want to delete this Category ?',
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        this.removeCategory(row.CategoryID)
      }
    });
  }

  removeCategory(CategoryID): void {
    this.categoryService.deleteCategories(CategoryID).then(result => {
      this.data = result.data.Result;
      if (this.data === 'Category can not be deleteed becuse it Exist in HFASource ') {
        const message = { severity: 'error', summary: 'Error  Message', detail: 'It Exist in HFASource' }
        this.messageService.showMessage(message)
        return;
      }
      if (this.data === 'Category can not be deleteed becuse it Exist in Report ') {
        const message = { severity: 'error', summary: 'Error  Message', detail: 'It Exist in Report' }
        this.messageService.showMessage(message)
        return;
      }
      this.getCategoriesDetails();
      const message = { severity: 'success', summary: 'Success  Message', detail: 'Delete Successfully' }
      this.messageService.showMessage(message)
    })
  }

  SaveCategory(): void {
    if (this.hfaCategoryDetail.CategoryName === undefined || this.hfaCategoryDetail.CategoryName === '') {
      const message = { severity: 'error', summary: 'Error Message', detail: 'Invalid Category Name' }
      this.messageService.showMessage(message)
      this.getCategoriesDetails();

    } else {
      this.categoryService.SaveCategoryDetail(this.hfaCategoryDetail).then(result => {
        $('.closeButton').trigger('click');
        this.hfaCategoryDetail.CategoryName = ''
        this.getCategoriesDetails();
      })
    }

  }
}
