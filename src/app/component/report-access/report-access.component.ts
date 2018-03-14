import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/utils/notification.service';
import { AccessLogModel } from './shared/report-access.model';
import { ReportAccessService } from './shared/report-access.service'

declare const $;

@Component({
    selector: 'app-report-access',
    templateUrl: './report-access.component.html',
     styleUrls: ['./report-access.component.css']
})
export class ReportAccessComponent implements OnInit {
    totalAccessLogs: number;
    companies: Array<any> = [];
    users: Array<any> = [];
    reportAccessLogs: Array<any> = []

    public accessLogModel: AccessLogModel = new AccessLogModel()
    constructor(private accessService: ReportAccessService,
        private router: Router, public notificationService: NotificationService, ) {
        this.getCompanys();

    }

    ngOnInit() {
        // this.getCompanys();
        this.accessLogModel.CompanyID = 'all';
        this.accessLogModel.UserName = 'all';
    }

    getCompanys() {
        this.accessService.getCompanyList().then((result) => {
            this.companies = result.data;
            this.companies.map((item) => {
                item.label = item.companyName;
                item.value = item.companyID;
            })
            const object = { value: 'all', label: 'All' }
            this.companies.splice(0, 0, object);
            this.getUsers();
        })
    }

    getUsers() {

        this.accessService.getUserList().then((result) => {
            this.users = result.data;
            this.users.map((item) => {
                item.label = item.userName;
                item.value = item.id;
            })
            const object = { label: 'All', value: 'all' }
            this.users.splice(0, 0, object);
            this.getReportAccessLogDetails()
        })
    }
    getReportAccessLogDetails() {
        if (this.accessLogModel.UserName && this.accessLogModel.UserName !== 'all') {
            const selectedUser = this.users.filter((item) => {
                return this.accessLogModel.UserName === item.id;
            })[0];
            this.accessLogModel.UserName = selectedUser.userName;
        }
        console.log(this.accessLogModel)
        this.accessService.getReportAccessDetails(this.accessLogModel).then((data) => {
            this.reportAccessLogs = data.data;
            this.totalAccessLogs = data.data.length;

        })
    }
}