import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/utils/notification.service';
import { UserModel, ReportModel, CompanyModel } from './shared/user.model';
import { UserService } from './shared/user.service';
import { Message } from 'primeng/components/common/api';
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'


declare const $;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    //   styleUrls: ['./report.component.css']
})
export class UserComponent implements OnInit {
    totalDB: number;
    moduleName = 'Users';
    faIcon = 'fa fa-user fa-fw';
    users: Array<UserModel> = [];
    addFunctionName = 'User';
    public companyID: string;
    public roleId: number;
    public deleteUserId: string;
    message: Message[] = [];
    public Reports: Array<ReportModel> = [];
    public Company: Array<CompanyModel> = [];
    @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
    gb;
    constructor(
        private router: Router, public notificationService: NotificationService,
        private userService: UserService) {

    }

    ngOnInit() {
        this.gb = this.searchInput._gb.nativeElement;
        this.getUserList();
    }

    getUserList() {
        this.companyID = localStorage.getItem('companyId')
        this.roleId = +(localStorage.getItem('roleId'))
        if (this.roleId === 1) {
            this.companyID = '0'
        }
        this.userService.getUserList(this.companyID).then((res) => {
            this.users = res.data;
            this.totalDB = res.data.length;
        });
    }


    onNewUserAdd(): void {
        this.router.navigate(['user/AddNew/' + 0 + '/' + this.totalDB]);
    }

    onUserEdit(userId): void {
        this.router.navigate(['user/Entry/' + userId + '/' + this.totalDB]);
    }


    delete(user) {
        this.notificationService.smartMessageBox({
            title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete Category - <span class='txt-color-orangeDark'><strong>" + user.userName + $('#show-shortcut').text() + "</strong></span> ?",
            content: 'Are you sure you want to delete this DataSource ?',
            buttons: '[No][Yes]'

        }, (ButtonPressed) => {
            if (ButtonPressed === 'Yes') {
                this.deleteUser(user.id)
            }
        });
    }

    deleteUser(userId) {
        this.deleteUserId = userId;
        this.userService.getReportByUser(userId, null).then(res => {
            if (res.data.length > 0) {
                this.Reports = res.data;
                this.Company = [];
                this.userService.GetCompanyByUserID(userId).then(result => {
                    result.data.forEach(report => {
                        const obj = {
                            CompanyID: report.companyID, companyName: report.companyName,
                            Description: report.description, UserID: report.userID, Reports: []
                        };
                        obj.Reports = this.Reports.filter(company => {
                            return report.companyID === company.companyID
                        })
                        this.Company.push(obj)
                    })
                    $('#ShowReportsDialog').modal();
                    // this.message.push({ severity: 'info', summary: 'Message', detail: 'User Already Exist' })
                })
            } else {
                this.deleteUserById()
            }
        })
    }

    deleteUserById() {
        $('#ShowReportsDialog').modal('hide');
        this.userService.deleteUserById(this.deleteUserId).then((res) => {
            this.message.push({ severity: 'success', summary: 'Message', detail: res.data });
            this.getUserList();
        })
    }



}
