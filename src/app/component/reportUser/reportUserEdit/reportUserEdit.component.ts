import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportUserService } from '../shared/reportUser.service'
import { ReportUserModal, ReportUserEditModel } from '../shared/reportUser.model';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';


@Component({
  selector: 'app-reportuser',
  templateUrl: './reportUserEdit.component.html',
  styleUrls: ['./reportUserEdit.component.css']
})
export class ReportUserEditComponent implements OnInit {
  moduleName = 'Reports Users';
  faIcon = 'fa fa-user fa-fw';
  totalDB: number;
  userID: number;
  msgs: Message[] = [];
  getReportByUserID: Array<ReportUserEditModel> = [];
  // getReportByUserID: ReportUserEditModel = new ReportUserEditModel();
  userDetail: ReportUserModal = new ReportUserModal();
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public reportUserService: ReportUserService,
    public messageService: MessageService
  ) {
    this.userID = this.route.snapshot.params['UserID'] || 0;
    this.totalDB = this.route.snapshot.params['totalDb']
    if (this.userID !== 0) {
      this.GetReportByServiceUserID(this.userID);
      this.GetServiceUser(this.userID);
    }
  }

  ngOnInit() {
  }

  cancel(): void {
    this.router.navigate(['serviceRepUser'])
  }

  GetReportByServiceUserID(userID): void {
    this.reportUserService.GetReportByServiceUserID(userID).then(result => {
      this.getReportByUserID = result.data.Result;
    })
  }

  GetServiceUser(userID): void {
    this.reportUserService.GetServiceUser(userID).then(result => {
      this.userDetail = result.data.Result;
    })

  }

  SaveReportForUser(): void {
    this.reportUserService.SaveReportForUser(this.getReportByUserID).then(result => {
      const message = { severity: 'success', summary: 'Success  Message', detail: 'Save Successfully' }
      this.messageService.showMessage(message)
      this.router.navigate(['serviceRepUser'])
    })
  }
}
