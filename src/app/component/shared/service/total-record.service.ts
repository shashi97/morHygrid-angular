import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TotalRecordService {
    // Observable navItem source
    public _navItemSource = new BehaviorSubject<any>(0);
    // Observable navItem stream
    navItem$ = this._navItemSource.asObservable();
    // service command
    changetotalDB(data) {
        this._navItemSource.next(data);
    }

    getDbLingth() {
        let totalRecord;
        this.navItem$.subscribe(res => {
            totalRecord = res;
        })
        return totalRecord;
    }
}
