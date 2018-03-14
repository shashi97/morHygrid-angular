import { Injectable, OnInit } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { LocalStorageService } from '../core/service/local-storage.service';
@Injectable()

export class RouteService implements OnInit {
    roleId: Number;

    constructor(
        private localStorageService: LocalStorageService
    ) {

    }
    ngOnInit() {
    }

    topModuleMenus(moduleName) {
        let arr = [];
        switch (moduleName) {
            case 'hfaDatabase':
                arr = [{ title: 'Sources', sref: 'hfaDatabase', defaultMenu: '' }];
                break;
            case 'report':
                arr = [{ title: 'Reports', sref: 'report', defaultMenu: '' }];
                break;
            case 'category':
                arr = [{ title: 'Category', sref: 'category', defaultMenu: '' }];
                break;

            case 'reportUser':
                arr = [{ title: 'Reports Users', sref: 'serviceRepUser', defaultMenu: '' }]
                break;
            case 'colFormatting':
                arr = [{ title: 'System Setting', sref: 'colFormatting', defaultMenu: '' }]
                break;
            case 'company':
                arr = [{ title: 'Client', sref: 'company', defaultMenu: '' }]
                break;
            case 'reportViewer':
                arr = [{ title: 'Company', sref: 'reportViewer', defaultMenu: '' }]
                break;
            case 'user':
                arr = [{ title: 'Company', sref: 'user', defaultMenu: '' }]
                break;
            // case 'useraccess':
            //     arr = [{ title: 'Company', sref: 'useraccess', defaultMenu: '' }]
            //     break;
            // case 'reportaccess':
            //     arr = [{ title: 'Company', sref: 'reportaccess', defaultMenu: '' }]
            //     break;
            // case 'installs':
            //     arr = [{ title: 'Company', sref: 'installs', defaultMenu: '' }]
            //     break;

        }
        return arr;
    }

    topMenues() {
        return [
            {
                title: 'Sources', name: 'hfaDatabase', isActive: false, isShow: false, href: '/hfaDatabase',
                iconClass: 'fa fa-lg fa-fw fa-database'
            },
            { title: 'Reports', name: 'report', isActive: false, isShow: false, href: '/report', iconClass: 'fa fa-lg fa-fw fa-th' },
            {
                title: 'Reports Users', name: 'reportUser', isActive: false,
                isShow: false, href: '/serviceRepUser', iconClass: 'fa fa-lg fa-fw fa-user'
            },
            { title: 'Category', name: 'category', isShow: false, isActive: false, href: '/category', iconClass: 'fa fa-lg fa-fw fa-tags' },
            {
                title: 'System Setting', name: 'colFormatting', isShow: false, isActive: false, href: '/colFormatting',
                iconClass: 'fa fa-lg fa-fw fa-gear'
            },

            {
                title: 'Client', name: 'Client', isActive: false,
                href: '/company', isShow: false, iconClass: 'fa fa-lg fa-fw fa-building'
            },
            {
                title: 'Report Viewer', name: 'ReportViewer', isActive: false, href: '/reportViewer', isShow: false,
                iconClass: 'fa fa-lg fa-fw fa-bar-chart'
            },
            { title: 'User', name: 'User', isActive: false, href: '/user', isShow: false, iconClass: 'fa fa-lg fa-fw fa-user' },
            // {
            //     title: 'User Access', name: 'userAccess', isActive: false,
            //     isShow: false, href: '/useraccess', iconClass: 'fa fa-lg fa-fw fa-history'
            // },
            // {
            //     title: 'Report Access', name: 'reportAccess', isActive: false, href: '/reportaccess',
            //     iconClass: ' fa fa-lg fa-fw fa-info-circle'
            // },
            // { title: 'Install Add-Ins', name: 'installAdd-Ins',
            // isActive: false, href: '/installs', iconClass: ' fa fa-lg fa-fw fa-cube' },


        ]

    }

    selectTopMenu(selectedTpMenu) {
        const menus = this.topMenues();
        if (selectedTpMenu.length !== 0) {
            menus.map(res => {
                if (res.name === selectedTpMenu[0].path) {
                    res.isActive = true;
                } else {
                    res.isActive = false;
                }
            });
        }
        return this.setPermission(menus);

    }

    setPermission(menus) {

        menus.map(res => {
            this.roleId = +(localStorage.getItem('roleId'));
            if (res.name === 'hfaDatabase' && (this.roleId === 1 || this.roleId === 2)) {
                res.isShow = true;
            }
            if (res.name === 'report' && (this.roleId === 1 || this.roleId === 2 || this.roleId === 3)) {
                res.isShow = true;
            }
            if (res.name === 'reportUser' && (this.roleId === 1 || this.roleId === 2 || this.roleId === 3)) {
                res.isShow = true;
            }
            if (res.name === 'category' && (this.roleId === 1 || this.roleId === 2 || this.roleId === 3)) {
                res.isShow = true;
            }
            if (res.name === 'colFormatting' && (this.roleId === 1 || this.roleId === 2)) {
                res.isShow = true;
            }
            if (res.name === 'Client' && (this.roleId === 1)) {
                res.isShow = true;
            }
            if (res.name === 'ReportViewer') {
                res.isShow = true;
            }
            if (res.name === 'User' && (this.roleId === 1 || this.roleId === 2)) {
                res.isShow = true;
            }
            // if (res.name === 'userAccess' && (this.roleId === 1 || this.roleId === 2)) {
            //     res.isShow = true;
            // }
            // if (res.name === 'reportAccess' && (this.roleId === 1 || this.roleId === 2)) {
            //     res.isShow = true;
            // }
            // if (res.name === 'installAdd-Ins' && (this.roleId === 1 || this.roleId === 2)) {
            //     res.isShow = true;
            // }
        })
        return menus
    }





}
