import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnFormatModel } from './shared/systemSetting.module';
import { SystemSettingService } from './shared/systemSetting.service';
import { MessageService } from '../shared/message/messageService.service'

@Component({
  selector: 'app-category',
  templateUrl: './systemSetting.component.html',
  styleUrls: ['./systemSetting.component.css']
})
export class SystemSettingComponent implements OnInit {
  totalDB: number;
  moduleName = 'Data Type Display Format';
  faIcon = 'fa fa-gear fa-fw';
  columnDisplayFormats: Array<ColumnFormatModel> = []
  DataTypeFormats: Array<any> = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public systemSettingService: SystemSettingService,
    public messageService: MessageService
  ) {
  }

  
  ngOnInit() {
    this.getDataTypeDisplayFormats();
  }

  getDataTypeDisplayFormats(): void {
    this.systemSettingService.getDataTypeDisplayFormats().then(result => {
      this.DataTypeFormats = result.data.Result
      this.getColumnDisplayFormats();
    })

  }

  getColumnDisplayFormats(): void {
    this.systemSettingService.getColumnDisplayFormats().then(result => {
      this.columnDisplayFormats = result.data.Result;
      this.totalDB = this.columnDisplayFormats.length
    })
  }

  onSelectDataTypeFormat(event, format) {
    format.DisplayFormatValue =  event;
  }

  saveColumnDisplayFormat(): void {
    this.columnDisplayFormats.filter(data => {
      if (data.DisplayFormatValue === undefined || data.DisplayFormatValue === null) {
        // this.columnDisplayFormats.DisplayFormatValue = '';
      }
    })
    this.systemSettingService.saveColumnDisplayFormat(this.columnDisplayFormats).then(result => {
      const message = { severity: 'success', summary: 'Success Message', detail: 'Save Successfully' }
      this.messageService.showMessage(message)
      this.getColumnDisplayFormats();
    })
  }
}
