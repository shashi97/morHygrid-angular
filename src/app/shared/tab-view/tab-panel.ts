/**
 * Created by giscafer on 2017-07-19.
 */
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ComponentFactoryResolver,
  Type,
  ViewContainerRef,
  ComponentRef,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { TabConfig } from './TabConfig';


@Component({
  selector: 'ui-tab-panel',
  template: '<div #dynamicContainer></div>'
})
export class UITabPanelComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  tabItem: TabConfig;
  @Output() gridOptionsData: EventEmitter<any> = new EventEmitter();

  _gridData: any[] = [];
  _saveLayOut: any[] = [];
  _columnDefs: any[] = [];
  _layoutData: any[] = [];
  @Input() get gridData(): any[] {

    return this._gridData;
  }
  set gridData(val: any[]) {
    // if (this.componentRef) {
    //   (<any>this.componentRef.instance).gridData = val;
    // }
    this._gridData = val;
  }
  @Input() get saveLayOut(): any[] {
    //(<any>this.componentRef.instance).saveLayOut = this._saveLayOut;
    return this._saveLayOut;
  }
  set saveLayOut(val: any[]) {
    // if (this.componentRef) {
    //   (<any>this.componentRef.instance).saveLayOut = val;
    // }
    this._saveLayOut = val;
  }
  @Input() get columnDefs(): any[] {
    // (<any>this.componentRef.instance).columnDefs = this._columnDefs;
    return this._columnDefs;
  }
  set columnDefs(val: any[]) {
    // if (this.componentRef) {
    //   (<any>this.componentRef.instance).columnDefs = val;
    // }
    this._columnDefs = val;
  }
  @Input() get layoutData(): any[] {

    return this._layoutData;
  }
  set layoutData(val: any[]) {
    // if (this.componentRef) {
    //   (<any>this.componentRef.instance).layoutData = val;
    // }
    this._layoutData = val;
  }
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContentContainer: ViewContainerRef;

  currentTabIndex = 1;
  componentRef: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  ngAfterViewInit(): void {
  }


  loadComponent() {
    // this.currentTabIndex = (this.currentTabIndex + 1) % this.tabs.length;
    if (!this.tabItem.component) {
      return false;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.tabItem.component);

    // let viewContainerRef = this.tabHost.viewContainerRef;
    // this.dynamicContentContainer.clear();

    this.componentRef = this.dynamicContentContainer.createComponent(componentFactory);
    if (this.componentRef.instance.gridOptionsData) {
      this.componentRef.instance.gridOptionsData.subscribe((event) => {
        this.gridOptionsData.emit(event);
      });
    }
    (<any>this.componentRef.instance).saveLayOut = this.saveLayOut;
    (<any>this.componentRef.instance).columnDefs = this.columnDefs;
    (<any>this.componentRef.instance).layoutData = this.layoutData;
    (<any>this.componentRef.instance).gridData = this.gridData;
    // this.componentRef.destroy();
    // this.componentRef = new ComponentRef<any>();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }


}
