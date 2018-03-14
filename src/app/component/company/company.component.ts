import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from './shared/company.service';
import { CompanyModel } from './shared/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/utils/notification.service';
import { Message } from 'primeng/components/common/api';
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component';
declare const $;

@Component({
    selector: 'app-comapny',
    templateUrl: './company.component.html',
    //   styleUrls: ['./report.component.css']
})
export class CompanyComponent implements OnInit {
    totalDB: number;
    moduleName = 'Companies';
    faIcon = 'fa fa-building fa-fw';
    companies: Array<CompanyModel> = [];
    addFunctionName = 'Company'
    message: Message[] = [];
    @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
    gb;
    constructor(private companyService: CompanyService,
        private router: Router, public notificationService: NotificationService, ) {

    }

    ngOnInit() {
        this.gb = this.searchInput._gb.nativeElement;
        this.getCompanys();
    }

    getCompanys() {
        this.companyService.getCompanyList().then((result) => {
            this.companies = result.data;
            this.totalDB = result.data.length;
        })
    }
    addNewCompany(): void {
        this.router.navigate(['company/AddNew/' + 0 + '/' + this.totalDB]);
    }

    editCompany(companyId): void {
        this.router.navigate(['company/Entry/' + companyId + '/' + this.totalDB]);
    }


    showPopup(companyId) {
        this.notificationService.smartMessageBox({
            title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete DataSource <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
            content: "Are you sure you want to delete this DataSource ?",
            buttons: '[No][Yes]'

        }, (ButtonPressed) => {
            if (ButtonPressed === 'Yes') {
                this.deleteCompanyById(companyId)
            }
        });
    }

    deleteCompanyById(companyId) {
        this.companyService.deleteCompanyById(companyId).then((res) => {
            this.message.push({ severity: 'info', summary: 'Message', detail: res.data });
            this.getCompanys();
        })
    }

}
