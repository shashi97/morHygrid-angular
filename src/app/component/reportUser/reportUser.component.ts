import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportUserService } from './shared/reportUser.service'
import { ReportUserModal } from './shared/reportUser.model';

@Component({
  selector: 'app-reportuser',
  templateUrl: './reportUser.component.html',
  styleUrls: ['./reportUser.component.css']
})
export class ReportUserComponent implements OnInit {
  moduleName = 'Report Users';
  faIcon = 'fa fa-user fa-fw';
  totalDB: number;
  serviceUserDetails: Array<ReportUserModal> = []

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public reportUserService: ReportUserService
  ) {
  }

  ngOnInit() {
    const role = localStorage.getItem('roleId')
    this.getServiceUserDetails(role);
  }

  getServiceUserDetails(roleID): void {
    this.reportUserService.getServiceUserDetails(roleID).then(result => {
      this.serviceUserDetails = result.data.Result;
      this.totalDB = result.data.Result.length;
    })
  }

  editReportUser(UserID): void {
    this.router.navigate([  'serviceRepUser/' + UserID + '/' + this.totalDB])
  }

}
