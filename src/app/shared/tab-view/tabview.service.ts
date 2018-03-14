/**
 * tabview服务，获取注册页面数组
 * Created by giscafer on 2017-07-20.
 */


import {Injectable} from '@angular/core';

import {TabItem} from './tab-item';

import ENTRY_COMPONENTS from 'app/modules/EntryComponents';

@Injectable()
export class TabViewService {
    tabs: any[] = [];

    constructor() {

    }

    getTabs() {
        const tabs = [];
        for (const c of ENTRY_COMPONENTS) {
            const item = new TabItem(c, {name: c['componentName'] || '无名称'});
            tabs.push(item);
        }
        this.tabs = tabs;
        return tabs;
    }

    getTabByName(name: string) {
        for (const tab of this.tabs) {
            if (tab.data && tab.data.name === name) {
                return tab;
            }

        }
    }

}
