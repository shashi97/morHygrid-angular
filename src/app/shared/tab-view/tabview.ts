/**
 * ui-tabview组件，基于primeng p-tabview实现
 * Created by giscafer on 2017-07-19.
 */
import {
  Component, OnInit, Input, Output, AfterViewInit, NgModule, EventEmitter, ViewChild,
  Renderer, OnDestroy, OnChanges, NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { UITabPanelComponent } from './tab-panel';
import { TabViewModule } from './p-tab-view/p-tab-view.component';
import {SharedComponentModule} from '../../component/shared/shared-component.module';
import { OverlayPanelModule, MenuModule } from 'primeng/primeng';
// import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';


// import { RichGridComponent } from '../../core/ag-data-table/rich-grid.component';
// import { DateComponent } from '../../core/ag-data-table/date-component/date.component';
// import { HeaderComponent } from '../../core/ag-data-table/header-component/header.component';
// import { HeaderGroupComponent } from '../../core/ag-data-table/header-group-component/header-group.component';

declare const $;
declare const _;
@Component({
  templateUrl: './tabview.html',
  styleUrls: ['./tabview.css'],
  selector: 'ui-tabview'
})
export class UITabViewComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  // @Input()
  _tabs: any[] = [];
  tabRef: any;
  @Output() gridOptionsData: EventEmitter<any> = new EventEmitter();
  _gridData:any[] = [];
  _saveLayOut:any[] = [];
  _columnDefs:any[] = [];
  _layoutData:any[] = [];
  @Input() get gridData(): any[] {
    
    return this._gridData;
  }
  set gridData(val: any[]) {
 
    this._gridData = val;
  }
  @Input() get saveLayOut(): any[] {
    
    return this._saveLayOut;
  }
  set saveLayOut(val: any[]) {
 
    this._saveLayOut = val;
  }
  @Input() get columnDefs(): any[] {
    
    return this._columnDefs;
  }
  set columnDefs(val: any[]) {
 
    this._columnDefs = val;
  }
  @Input() get layoutData(): any[] {
    
    return this._layoutData;
  }
  set layoutData(val: any[]) {
 
    this._layoutData = val;
  }

  @Input() get tabs(): any[] {
    return this._tabs;
  }

  set tabs(val: any[]) {
    this._tabs = val;
  }

  @Input()
  activeIndex = 0;

  @Output()
  tabChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  tabClose: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  newTabAdd: EventEmitter<any> = new EventEmitter<any>();


  documentClickListener: any;

  items: any = [{
    label: 'Shut down',
    icon: 'fa-close',
    command: (event) => {
      this.closeCommand(event, 'current')
    }
  }, {
    label: 'Close all',
    icon: 'fa-close',
    command: (event) => {
      this.closeCommand(event, 'all')
    }
  }, {
    label: 'Rename',
    icon: 'fa fa-pencil-square-o',
    command: (event) => {
      this.rename(event, 'rename')
    }
  }
  ];

  // Right-click menu source
  private cacheContextClickTarget: any;

  constructor(public renderer: Renderer, private _ngZone: NgZone) {

  }

  ngOnInit(): void {
  }
  ongridOptionsData($event){
    this.gridOptionsData.emit($event);
  }

  callFromParent(tabs) {

    //   this._ngZone.run(() => {
    //    this.tabs = tabs;
    // });
  }

  ngOnChanges() {
  }

  ngAfterViewInit(): void {
    const contextMenu = $('#contextMenu');
    this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
      contextMenu.hide();
    });
    $('ul[p-tabviewnav]').bind('contextmenu', (e) => {
      const oe = e.originalEvent;
      const target = oe.target;
      if (target.nodeName === 'SPAN') {
        this.cacheContextClickTarget = $(target);
      } else {
        this.cacheContextClickTarget = $(target).find('span');
      }
      contextMenu.css('left', oe.x);
      contextMenu.css('top', oe.y);
      contextMenu.show();
      e.preventDefault();
    });

  }

  handleChange(e) {
    this.tabChange.emit(e);
  }

  handleClose(e) {
    this.tabClose.emit(e);
  }

  addNewRecord(e) {
    this.newTabAdd.emit(e);
  }

  /**
   * Get the selected tab
   */
  findSelectedTab() {
    return this.tabRef.findSelectedTab();
  }

  tabPanelClick(index) {
    this.activeIndex = index;
  }

  /**
   * Batch delete tab tab
   * @param $event
   * @param type
   */
  rename($event, type) {
    switch (type) {
      case 'rename':
        const text = this.cacheContextClickTarget.html();
        const tabIndex = this.getTabIndexByName(text);
        this.tabs[tabIndex].data.isEditable = true;
        break;
    }

  }

  closeCommand($event, type) {
    const text = this.cacheContextClickTarget.html();
    const tabIndex = this.getTabIndexByName(text);
    if (tabIndex === null) {
      return;
    }
    switch (type) {
      case 'current':
        this.tabs.splice(tabIndex, 1);
        break;
      case 'left':
        _.remove(this.tabs, function (n, index) {
          return index < tabIndex;
        });
        break;
      case 'right':
        _.remove(this.tabs, function (n, index) {
          return index > tabIndex;
        });
        break;
      case 'other':
        _.remove(this.tabs, function (n, index) {
          return index !== tabIndex;
        });
        break;
      case 'all':
        this.tabs.length = 0;
        break;
      default:
        break;

    }
    $('#contextMenu').hide();
  }

  /**
   * Bookmark page
   * @param name
   * @returns {any}
   */
  getTabIndexByName(name: string) {
    let res = null;
    this.tabs.forEach((tab, index) => {
      if (tab.data && tab.data.name === name) {
        res = index;
      }
    });
    return res;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}


@NgModule({
  declarations: [
    UITabViewComponent,
    UITabPanelComponent,
    //  RichGridComponent,
    //  DateComponent,
    // HeaderComponent,
    // HeaderGroupComponent
  ],
  imports: [TabViewModule, CommonModule, OverlayPanelModule, MenuModule,FormsModule,
  
    // AgGridModule.withComponents([DateComponent,
    //   HeaderComponent,
    //   HeaderGroupComponent])
  ],
  exports: [
    UITabViewComponent,
    UITabPanelComponent,
    // DateComponent,
    // HeaderComponent,
    // HeaderGroupComponent,
    // AgGridModule
    // SharedComponentModule,
    // RichGridComponent
  ],
  providers: [],
  // bootstrap: [RichGridComponent]
})
export class UITabViewModule {
}
