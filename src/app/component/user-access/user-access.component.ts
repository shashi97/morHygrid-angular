import { Component, OnInit } from '@angular/core';
import { UserAccessService } from './shared/user-access.service'
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/utils/notification.service';
import { AccessLogModel } from './shared/user-access.model'
declare const $;

@Component({
    selector: 'app-user-access',
    templateUrl: './user-access.component.html',
    styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {
    TotalAccessLogs: number;
    companies: Array<any> = [];
    users: Array<any> = [];
    ReportAccessLogs: Array<any> = []

    public accessLogModel: AccessLogModel = new AccessLogModel()
    constructor(private userAccessService: UserAccessService,
        private router: Router, public notificationService: NotificationService, ) {
        this.getCompanys();
       
    }

    ngOnInit() {
        // this.getCompanys();
        this.accessLogModel.CompanyID = "all";
        this.accessLogModel.UserName = "all";
    }

    getCompanys() {
        this.userAccessService.getCompanyList().then((result) => {
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

        this.userAccessService.getUserList().then((result) => {
            this.users = result.data;
            this.users.map((item) => {
                item.label = item.userName;
                item.value = item.id;
            })
            const object = { label: 'All', value: 'all' }
            this.users.splice(0, 0, object);
            this.getUserAccessLogDetails()
        })
    }
    getUserAccessLogDetails() {
        if (this.accessLogModel.UserName && this.accessLogModel.UserName !== 'all') {
            const selectedUser = this.users.filter((item) => {
                return this.accessLogModel.UserName === item.id;
            })[0];
            this.accessLogModel.UserName = selectedUser.userName;
        }
        console.log(this.accessLogModel)
        this.userAccessService.getUserAccessDetails(this.accessLogModel).then((data) => {
            this.ReportAccessLogs = data.data;
            this.TotalAccessLogs = data.data.length;

        })
    }
}