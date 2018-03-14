import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from './shared/header.model';
import { HeaderService } from './shared/header.service';
import { LocalStorageService } from '../../../core/service/local-storage.service'
declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public companyList: Array<CompanyModel> = new Array<CompanyModel>();
  public selectedCompany: CompanyModel = new CompanyModel();
  public TotalCompany: number;
  public showCompanyList = false;
  public companyId: number;
  public roleId: number;
  public isDisable = true;
  constructor(private router: Router, private headerService: HeaderService,
    private localStorageService: LocalStorageService) {
    this.getCompanyDetails();
  }

  ngOnInit() {
    this.getCompanyDetails();

  }


  searchMobileActive = false;

  toggleSearchMobile() {
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }

  getCompanyDetails() {
    this.roleId = +(localStorage.getItem('roleId'));
    if (this.roleId === 1) {
      this.isDisable = false;
    }
    if (this.roleId !== 1) {
      const selectedCompanyId = localStorage.getItem('companyId')
      this.headerService.getCompanyListById(selectedCompanyId).then(res => {
        this.selectedCompany = res.data;
      })
      return;
    }

    this.headerService.getCompanyList().then(company => {
      this.companyList = company.data.Result;
      this.TotalCompany = this.companyList.length;
      this.headerService.getSelectedCompany().then(selectedComapny => {
        this.selectedCompany = selectedComapny.data.Result
        this.localStorageService.setCurrentCompnay(this.selectedCompany);
      })
    })
  }

  onCompanyChange(companyId, state) {

    this.selectedCompany = this.companyList.filter(res => {
      return res.CompanyID === companyId;
    })[0];
    this.showCompanyList = false;
    this.localStorageService.setCurrentCompnay(this.selectedCompany);
    this.headerService.setCurrentCompany(this.selectedCompany).then(res => {
      console.log(res);
      location.reload();
    });
  }
}
