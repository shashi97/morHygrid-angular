import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HFADataService } from './shared/hfadatabase.service';
import { HFADatabaseModel } from './shared/hfadatabase.model';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
declare const $;

@Component({
  selector: 'app-hfadatabase',
  templateUrl: './HFADataBase.component.html',
  styleUrls: ['./HFADataBase.component.css']
})
export class HFADataBaseComponent implements OnInit {
  hfaDatabase: HFADatabaseModel = new HFADatabaseModel();
  hfaDataBaseDetails: Array<HFADatabaseModel> = [];
  totalDB: number;
  moduleName = 'Sources';
  addFunctionName = 'Source';
  faIcon = 'fa fa-database fa-fw';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
  gb;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public hfadataService: HFADataService,
    public notificationService: NotificationService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.getHFADataBaseDetails()
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
    this.getHFADataBaseDetails()
  }

  delete(row) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete DataSource -  <span class='txt-color-orangeDark'><strong>" + row.DatabaseName + $('#show-shortcut').text() + "</strong></span> ?",
      content: "Are you sure you want to delete this DataSource ?",
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        this.deleteHfaDatabase(row.HFADatabaseID)
      }
    });
  }

  getHFADataBaseDetails(): void {
    this.hfadataService.getHFADataBaseDetails().then(result => {
      this.hfaDataBaseDetails = result.data.Result;
      this.totalDB = result.data.Result.length;
    })
  }

  addnewSource() {
    this.addNewSource();
  }



  addNewSource(): void {
    this.router.navigate(['hfaDatabase/AddNew/' + this.totalDB]);
  }

  editHfaDataBase(HFADatabaseID): void {
    this.router.navigate(['hfaDatabase/Entry/' + HFADatabaseID + '/' + this.totalDB]);
  }

  deleteHfaDatabase(HFADatabaseID): void {
    this.hfadataService.deleteHfaDatabase(HFADatabaseID).then(result => {
      const msg = result.data.Result;
      let message = {};
      if (msg == 'HFADatabase Exist in Report') {
        message = { severity: 'error', summary: 'Source Exist!', detail: msg }
      } else {
        message = { severity: 'success', summary: 'Success', detail: msg }
        this.getHFADataBaseDetails();
      }
      this.messageService.showMessage(message)
    })
  }
}
