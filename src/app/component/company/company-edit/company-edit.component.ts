import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';
import { CompanyModel } from '../shared/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'app-company-edit',
    templateUrl: './company-edit.component.html',
    styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
    totalDB: number;
    header = '';
    addFunctionName = 'Company';
    faIcon = 'fa fa-building fa-fw';
    message: Message[] = [];
    public companyModel: CompanyModel = new CompanyModel()


    constructor(private companyService: CompanyService, public route: ActivatedRoute ,
        private router: Router) {

    }

    ngOnInit() {
        this.companyModel.companyID = this.route.snapshot.params['CompanyId'] || 0;
        this.totalDB = this.route.snapshot.params['totalDB']
        if (Number(this.companyModel.companyID) !== 0) {
            this.getCompanyDetailsByCompanyId(this.companyModel.companyID)
        } else {
            this.header = 'Adding New Company'
        }
    }

    getCompanyDetailsByCompanyId(companyId) {
        this.companyService.getCompanyDetailsById(companyId).then((result) => {
            this.companyModel = result.data;
            this.header = 'Edit Company -' + '  ' + this.companyModel.companyName;
        })
    }

    SaveCompany() {
        if (this.companyModel.companyName === '') {
            this.message.push({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Company Name' });
            return;
        }
        if (this.companyModel.description === '') {
            this.message.push({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Description' });
            return;
        }
        this.companyService.SaveCompanyDetail(this.companyModel).then((res) => {
             this.message.push({ severity: 'success', summary: 'Success Message', detail: 'Save Successfully ' });
             this.cancel();
        })

    }

    cancel(): void {
        this.router.navigate(['/company']);
      }

}