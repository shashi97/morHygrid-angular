import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/utils/notification.service';
import { InstallAddInModel } from './shared/install-add-in.model';
import { InstallAddInService } from './shared/install-add-in.service'

declare const $;

@Component({
    selector: 'app-install-add-in',
    templateUrl: './install-add-in.component.html',
     styleUrls: ['./install-add-in.component.css']
})
export class InstallAddInComponent implements OnInit {
    totalAccessLogs: number;
    users: Array<any> = [];
    installs: Array<any> = []

    public installAddInModel: InstallAddInModel = new InstallAddInModel()
    constructor(private installAddInService: InstallAddInService,
        private router: Router, public notificationService: NotificationService, ) {
        this.getUsers();

    }

    ngOnInit() {
        this.installAddInModel.UserName = 'all';
    }

    getUsers() {
        this.installAddInService.getUserList().then((result) => {
            this.users = result.data;
            this.users.map((item) => {
                item.label = item.userName;
                item.value = item.id;
            })
            const object = { label: 'All', value: 'all' }
            this.users.splice(0, 0, object);
            this.getInstallAddInDetails()
        })
    }
    getInstallAddInDetails() {
        if (this.installAddInModel.UserName && this.installAddInModel.UserName !== 'all') {
            const selectedUser = this.users.filter((item) => {
                return this.installAddInModel.UserName === item.id;
            })[0];
            this.installAddInModel.UserName = selectedUser.userName;
        }

        this.installAddInService.getInstallsDetails(this.installAddInModel).then((data) => {
            this.installs = data.data;
            this.totalAccessLogs = data.data.length;

        })
    }
}