import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from './shared/report.service';
import { ReportModel } from './shared/report.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/utils/notification.service';
import { MessageService } from '../shared/message/messageService.service';
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component';
declare const $;

import { TotalRecordService } from '../shared/service/total-record.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  totalDB: number;
  moduleName = 'Reports';
  addFunctionName = 'Report';
  faIcon = 'fa fa-th fa-fw';
  reports: Array<ReportModel> = new Array<ReportModel>();
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
  gb;

  constructor(private reportService: ReportService,
    private totalRecordService: TotalRecordService,
    private notificationService: NotificationService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;

    this.getReportLists();
  }

  public getReportLists(): void {
    this.reportService.getReportListDetails().then(result => {
      this.reports = result.data.Result;
      this.totalDB = result.data.Result.length;
    })
  }

  addnewSource() {
    this.addNewSource();
  }

  addNewSource(): void {
    this.router.navigate(['report/AddNew/' + this.totalDB]);
  }

  editReport(ReportID): void {
    this.router.navigate(['report/Entry/' + ReportID + '/' + this.totalDB]);
  }

  delete(report) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete DataSource -  <span class='txt-color-orangeDark'><strong>" + report.ReportName + $('#show-shortcut').text() + "</strong></span> ?",
      content: 'Are you sure you want to delete this DataSource ?',
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        this.deleteReport(report.ReportID)
      }
    });
  }

  deleteReport(ReportID): void {
    this.reportService.DeleteReportDetails(ReportID).then(result => {
      const msg = result.data.Result;
      const message = { severity: 'success', summary: 'Success Message', detail: msg }
      this.messageService.showMessage(message)
      this.getReportLists();
    })
  }
}
