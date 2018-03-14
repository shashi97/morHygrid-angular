import { Component, OnInit } from '@angular/core';
import { HFADataService } from '../shared/hfadatabase.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HFADatabaseEntryModel, SourceTypemodel, Categorymodel, HfaDatabasCategoryModel } from '../shared/hfadatabase.model'
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { CategoryListmodel } from '../../shared/model/category.model';

declare const $;


@Component({
  selector: 'app-hfadata-base-entry',
  templateUrl: './hfadata-base-entry.component.html',
  styleUrls: ['./hfadata-base-entry.component.css']
})
export class HFADataBaseEntryComponent implements OnInit {
  sourceType: Array<SourceTypemodel> = [];
  categoryDetail: Array<Categorymodel> = [];
  hfaDataBase: HFADatabaseEntryModel = new HFADatabaseEntryModel();
  hfaCategoryDetail: HFADatabaseEntryModel = new HFADatabaseEntryModel();
  moduleName = 'Sources';
  faIcon = 'fa fa-user fa-fw';
  CategoryName: String;
  totalDB: number;
  hfaDatabaseID: number;
  isLoading: boolean;
  ConnectionStatus: string;
  public errorMsg: Message[] = [];
  categoryList: Array<CategoryListmodel> = [];
  isValidForm: true;

  selectedSourceType: SourceTypemodel = new SourceTypemodel();
  restServiceUrl: string;
  constructor(
    public messageService: MessageService,
    public hfadataService: HFADataService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    this.hfaDatabaseID = this.route.snapshot.params['HFADatabaseID'] || 0;
    this.totalDB = this.route.snapshot.params['totalDB']
    this.getCategory()
  }

  ngOnInit() {
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  getSourceType(): void {
    this.hfadataService.getSourceType().then(result => {
      this.sourceType = result.data.Result;
    })
    if (this.hfaDatabaseID !== 0) {
      this.GetHFADataBase();
    }
  }

  changeSourceType(): void {
    const selectedSourceType = this.sourceType.filter(source => {
      return source.DataSourceTypeID === Number(this.hfaDataBase.DataSourceTypeID);
    })[0];

    this.selectedSourceType = selectedSourceType ? selectedSourceType : new SourceTypemodel();
    if (this.selectedSourceType.SourceTypeName === 'RESTService') {
      this.hfaDataBase.ServerNameLabel = 'Host URI '
      this.hfaDataBase.ServerNameExampleLabel = 'eg: http://abc.sample.com/ or http://abc.sample.com:5678/'
      this.hfaDataBase.SourceNameExampleLabel = 'any label eg: Sample Server Data '
    } else {
      this.hfaDataBase.ServerNameLabel = 'Server Name '
      this.hfaDataBase.ServerNameExampleLabel = ''
      this.hfaDataBase.SourceNameExampleLabel = '(your database name)'
    }

  }

  getCategory(): void {
    this.hfadataService.getCategoryDetails().then(result => {
      this.categoryList = result.data.Result;
      this.getSourceType();
    })
  }

  GetHFADataBase(): void {
    this.hfadataService.GetHFADataBase(this.hfaDatabaseID).then(result => {
      this.hfaDataBase = result.data.Result ? result.data.Result : new HFADatabaseEntryModel();
      this.hfaDataBase.HFADatabaseID = this.hfaDatabaseID;
      this.hfaDataBase.IconClass = 'fa fa-fw fa-edit txt-color-blue';
      this.hfaDataBase.Header = 'Edit Report - ' + this.hfaDataBase.DatabaseName;
      if (this.hfaDataBase) {
        this.changeSourceType();
      }
    })
  }

  SaveCategory(hfaCategoryDetail): void {
    this.hfadataService.SaveCategoryDetail(hfaCategoryDetail).then(result => {
      this.categoryDetail.splice(this.categoryDetail.length, -1, hfaCategoryDetail)
      $('.closeButton').trigger('click');
    })
  }

  saveHFADataBase(isTestConnection, restServiceUrl): void {
    if ((this.selectedSourceType.DataSourceTypeID === undefined || this.selectedSourceType.DataSourceTypeID === 0) &&
      this.hfaDataBase.DataSourceTypeID === 0) {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Select Source Type' }
      this.messageService.showMessage(message)
      return;
    }
    if (this.selectedSourceType.SourceTypeName !== 'QuickBooks' && this.selectedSourceType.SourceTypeName !== 'RESTService') {
      if (this.hfaDataBase.LoginID === '' || this.hfaDataBase.LoginID === undefined || this.hfaDataBase.LoginID === null) {
        const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter Login ID' }
        this.messageService.showMessage(message)
        return;
      }
      if (this.hfaDataBase.Password === '' || this.hfaDataBase.Password === undefined || this.hfaDataBase.Password === null) {
        const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter Password' }
        this.messageService.showMessage(message)
        return;
      }
    }

    if (this.selectedSourceType.SourceTypeName === 'SalesForce') {
      if (this.hfaDataBase.ConsumerKey === '' || this.hfaDataBase.ConsumerKey === undefined || this.hfaDataBase.ConsumerKey === null) {
        const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter Consumer Key' }
        this.messageService.showMessage(message)
        return;
      }
      if (this.hfaDataBase.ClientSecret === '' || this.hfaDataBase.ClientSecret === undefined || this.hfaDataBase.ClientSecret === null) {
        const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter Client Secret' }
        this.messageService.showMessage(message)
        return;
      }
    }

    if (this.hfaDataBase.DatabaseName === '' || this.hfaDataBase.DatabaseName === null || this.hfaDataBase.DatabaseName === undefined) {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter Source Name' }
      this.messageService.showMessage(message)
      return;
    }
    this.hfadataService.saveHFADataBase(this.hfaDataBase).then(result => {
      if (isTestConnection) {
        this.hfadataService.GetHFADataBasePassword(this.hfaDatabaseID).then(hfa => {
          this.hfaDataBase.Password = hfa.data.Result;
          this.testDatabaseConnection(this.hfaDataBase, restServiceUrl)
        })
      }

      if (!isTestConnection) {
        const message = { severity: 'success', summary: 'Success  Message', detail: 'Save Successfully' }
        this.messageService.showMessage(message)
        this.cancel();
      }

    })
  }

  testConnection(): void {
    this.isLoading = true;
    // const selectedSourceType = this.sourceType.filter(source => {
    //     return source.DataSourceTypeID === Number(this.hfaDataBase.DataSourceTypeID);
    //   })[0];
    this.sourceType.filter(source => {
      if (source.DataSourceTypeID === Number(this.hfaDataBase.DataSourceTypeID)) {
        this.hfaDataBase.SourceName = source.SourceTypeName
      }
    })

    this.hfadataService.getServiceUrl().then(url => {

      let restServiceUrl = '';
      if (url.data.Status) {
        if (url.data.Result === 'invalidssl') {
          const message = { severity: 'error', summary: 'Error  Message', detail: 'Please configure Https SSL Url' }
          this.messageService.showMessage(message)
          return;
        } else if (url.data.Result === '' || !url.data.Result) {
          // will be handled on service now - 02/12/2016
          // restServiceUrl = servicePath;
        } else {
          restServiceUrl = url.data.Result;
        }

        if (this.hfaDatabaseID !== 0) {
          this.saveHFADataBase(true, restServiceUrl);
        } else {
          this.testDatabaseConnection(this.hfaDataBase, restServiceUrl);
        }
      }
    })
  }

  testDatabaseConnection(hfaDataBase, Url): void {
    this.hfadataService.testDatabaseConnection(hfaDataBase, Url).then(result => {
      if (this.hfaDataBase.HFADatabaseID !== 0) {
        this.hfaDataBase.Password = 'XXXXXXXXXXXXXXX';
      }
      this.ConnectionStatus = result.data;
    })
    this.isLoading = false;
  }

}


