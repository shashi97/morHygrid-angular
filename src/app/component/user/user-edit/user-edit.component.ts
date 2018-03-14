import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { UserService } from '../shared/user.service';
import { UserModel, UserCompanyModel } from '../shared/user.model';
import { MessageService } from '../../shared/message/messageService.service'

declare const $;
@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    public totalDB: number;
    public header = '';
    public roleId: number;
    public addFunctionName = 'Users';
    public faIcon = 'fa fa-building fa-fw';
    public message: Message[] = [];
    public files: any
    public userModel: UserModel = new UserModel();
    public userCompanyModel: UserCompanyModel = new UserCompanyModel()
    public confirmPassword: string;
    public Reports: Array<any> = [];
    public Companies: Array<any> = [];
    public display: Boolean = false;
    public isDisable: Boolean = false;
    public userDisable: Boolean = true;
    public Roles: Array<any> = [];
    public companyId: string;
    constructor(private userService: UserService, public route: ActivatedRoute,
        private router: Router, private messageService: MessageService) {
        this.userModel.userCompanyModel = [];
    }

    ngOnInit() {
        this.getRoles();
        this.roleId = +localStorage.getItem('roleId')
        this.userModel.id = this.route.snapshot.params['UserId'] || 0;
        this.totalDB = this.route.snapshot.params['totalDB']
        if (Number(this.userModel.id) === 0) {
            this.header = 'Adding New User';
        }
        this.getCompanyDetailsByCompanyId(this.userModel.id);
    }

    getCompanyDetailsByCompanyId(userId) {
        this.userService.getUserDetailsById(userId).then((result) => {
            this.userModel = result.data;
            this.userModel.userCompanyModel = result.data.userCompanyModel;
            if (this.userModel.roleID) {
                this.isDisable = true;
            }
            if (this.userModel.userName === '') {
                this.userDisable = false;
            }
            if (Number(this.userModel.id) !== 0) {
                this.header = 'Edit User -' + '  ' + this.userModel.userName;
            }
        })
    }
    getRoles() {
        this.Roles = [];
        this.userService.getRoles().then((result) => {
            //   this.Roles = result.data;
            result.data.map(res => {
                if (this.roleId === 2) {
                    if (res.roleID !== 1) {
                        this.Roles.push(res);
                    }
                } else {
                    this.Roles.push(res);
                }

            })
        })
    }


    getReports(company) {
        if (company.isChecked) {
            // this.userCompanyModel.companyName = company.companyName;
            // this.userCompanyModel.userID = company.userID;
            this.Reports = [];
            this.userService.getReportByUser(company.userID, company.companyID).then((data) => {
                if (data.data.length > 0) {
                    company.isChecked = true;
                    this.Reports = data.data;
                    this.userCompanyModel = company;
                    this.display = true;
                }
            })
        } else {

            const index = this.Companies.findIndex(x => x.companyID === company.companyID);
            if (index >= 0) {
                this.Companies.splice(index, 1);
            }
        }
    }


    deleteUserDetails() {
        const obj = { companyID: this.userCompanyModel.companyID, companyName: this.userCompanyModel.companyName, Reports: this.Reports };
        this.Companies.push(obj);
        this.userCompanyModel.isChecked = false;
        this.display = false;
    }

    saveUser() {
        this.companyId = localStorage.getItem('companyId')
        if (this.userModel.roleID !== 1) {
            this.userModel.userCompanyModel = this.userModel.userCompanyModel.filter(result => {
                this.userModel.userCompanyModel[0].isChecked = true;
                return result.companyID === this.companyId
            })
        }

        if (this.userModel.userName === '') {
            this.message.push({ severity: 'error', summary: 'Error Message', detail: 'Please Enter User Name' });
            return;
        }
        if (this.userModel.email === '') {
            this.message.push({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Email' });
            return;
        }

        if (Number(this.userModel.id) === 0) {
            if (this.userModel.password === '') {
                this.message.push({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Password' });
                return;
            }
            if (this.userModel.password !== this.confirmPassword) {
                this.message.push({ severity: 'error', summary: 'Error Message', detail: 'Password and Confirm Password Should Be Same' });
                return;
            }
            this.userModel.isNewImage = true;
        }

        this.userService.saveUserDetail(this.userModel).then((res) => {
            if (res.data !== 'User name or email already exists') {
                this.message.push({ severity: 'success', summary: 'save', detail: res.data });
                this.Reports = [];
                this.Companies.forEach((company) => {
                    this.Reports = this.Reports.concat(company.Reports);
                });
                const role = +localStorage.getItem('roleId')
                if (role === 1) {
                    this.userService.deleteReportUserByReportUserId(this.Reports).then((data) => {
                        this.message.push({ severity: 'info', summary: 'save', detail: data.data });
                        this.onCancel();
                    });
                }
                this.onCancel();
            } else {
                const error = { severity: 'error', summary: 'Duplicate Record Found', detail: res.data };
                this.messageService.showMessage(error);
            }
        })

    }



    imageChange(input) {
        // if (Number(this.userModel.id) !== 0) {
        //     this.userModel.isNewImage = true;
        // }
        this.userModel.isNewImage = true;
        // Loop through each picture file
        this.files = (input.target.files[0]);
        // Create an img element and add the image file data to it
        const img = document.createElement('img');
        img.src = window.URL.createObjectURL(input.target.files[0]);
        this.userModel.imageType = input.target.files[0].type;

        // Create a FileReader
        const reader = new FileReader();
        // Add an event listener to deal with the file when the reader is complete
        reader.addEventListener('load', (event: any) => {
            // Get the event.target.result from the reader (base64 of the image)
            img.src = event.target.result;
            // Push the img src (base64 string) into our array that we display in our html template
            this.userModel.imageSource = img.src;
        }, false);

        reader.readAsDataURL(input.target.files[0]);
    }


    onCancel(): void {
        this.router.navigate(['/user']);
    }

    onCancelFromFooter() {
        this.display = false;
    }

}
