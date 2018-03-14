/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  ComponentFactoryResolver,
  NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, HostListener, AfterContentInit,
  ContentChildren, ContentChild, Renderer, ChangeDetectorRef, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef, ViewChild, AfterViewInit

} from '@angular/core';

import { TabComponent } from './tab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';

import { IShContextMenuItem } from 'ng2-right-click-menu';
import { Tree } from '@angular/router/src/utils/tree';

declare const $;
declare const _;
@Component({
  selector: 'my-tabs',
  template: `
    <div [hidden]="dynamicTabs.length==0" [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation"
            [ngStyle]="style" [class]="styleClass">
      <div  class="ui-g">
        <div class="ui-g-12 ui-md-12 ui-lg-12" style="padding-bottom:0px">
          <div class="scroller scroller-left"
            (click)="isClickLeft===true?onLeft():''" ><i class="glyphicon glyphicon-chevron-left"></i>
          </div>
          <div class="scroller scroller-right"  (click)="isClickRight===true?onRight():''">
            <i class="glyphicon glyphicon-chevron-right"></i>
          </div>
          <div class="wrapper" #tabListContainer>
            <ul class="list nav nav-tabs">
              <!-- <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
                <a >{{tab.title}}</a>
              </li> -->
              <!-- dynamic tabs -->
              <li *ngFor="let tab of dynamicTabs" style="height:27px"
                  [sh-context]="tab.contextMenuItems" [sh-data-context]="dynamicTabs"
                  (click)="selectTab(tab)" [class.active]="tab.active">
                <a [ngClass]="{'tabRenamePad': tab.isEditable}"  style="height:27px;padding:4px">
                  <span *ngIf="!tab.isEditable" style="padding-left: 8px;" (dblclick)="clickEvent(tab)">{{tab.title}}</span>
                  <span *ngIf="!tab.isEditable" class="tab-close" (click)="closeTab(tab)" style="padding: 8px;"> 
                  <img  src="../../../assets/img/tab-close.jpg" alt="Image" style="height: 7px;">
                  </span>
                  <input *ngIf="tab.isEditable" [focus]="tab.renameFocus" type="text" 
                         (keyup.enter)="setLayoutTitle(tab)"
                        [(ngModel)]="tab.title" (blur)="setLayoutTitle(tab)" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr>
      </div>
      <div class="ui-tabview-panels">
        <ng-content></ng-content>
      </div>
      <ng-template dynamic-tabs #container></ng-template>
    </div>
  `,
  styles: [
    `
    .tab-close {
      color: gray;
      text-align: right;
      cursor: pointer;
    }
    `
  ]
})
export class TabsComponent implements AfterContentInit {
  dynamicTabs: TabComponent[] = [];

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  @ViewChild(DynamicTabsDirective)
  dynamicTabPlaceholder: DynamicTabsDirective;

  items: IShContextMenuItem[];

  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;

  @Input() orientation = 'top';

  @Input() styyle: any;

  @Input() styleClass: string;

  @Input() controlClose: boolean;
  isClickLeft = true;
  isClickRight = true;
  isLeftEnd = false;
  viewLength;
  itemsWidth;
  itemWidth;
  // @ContentChildren(TabPanelComponent) tabPanels: QueryList<TabPanelComponent>;
  // @ViewChild(TabViewNavComponent) child: TabViewNavComponent;
  @ViewChild('tabListContainer') _tabListContainer: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Input() isChart: boolean;
  @Input() isTable: boolean;
  @Output() isChartChange: EventEmitter<any> = new EventEmitter();
  @Output() isTableChange: EventEmitter<any> = new EventEmitter();
  documentClickListener: any;

  // Right-click menu source
  private cacheContextClickTarget: any;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef,
    public renderer: Renderer, ) {
    this.items = [
      {
        label: 'Rename',
        onClick: this.clickEvent
      }
    ];
  }

  clickEvent($event: any) {
    if (!$event.menuItem) {
      $event.isEditable = true;
      $event.renameFocus.emit(true);
    } else {
      $event.dataContext.forEach(tab => {
        tab.isEditable = tab.active;
        if (tab.active) {
          tab.renameFocus.emit(true);
        }
      });
    }
  };

  setLayoutTitle(tabData) {
    return tabData.isEditable = false
  }

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  openTab(layoutId: number, reportId: number, title: string, template, data, isCloseable = false) {
    // get a component factory for our TabComponent
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);

    // fetch the view container reference from our anchor directive
    let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // alternatively...
    // let viewContainerRef = this.dynamicTabPlaceholder;

    // create a component instance
    let componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    let instance: TabComponent = componentRef.instance as TabComponent;
    // instance.title = title + (this.dynamicTabs.length + 1);
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;
    instance.layoutId = layoutId;
    instance.reportId = reportId;
    instance.layoutJson = {};

    // remember the dynamic component for rendering the
    // tab navigation headers
    let selectedTab = this.dynamicTabs.filter(tab => {
      return tab.layoutId === layoutId && tab.reportId === reportId;
    })[0];
    if (!selectedTab) {
      this.dynamicTabs.push(componentRef.instance as TabComponent);
      selectedTab = this.dynamicTabs[this.dynamicTabs.length - 1];
    } else {
      selectedTab.dataContext = data;
      selectedTab.template = template
    }

    // set it active
    this.selectTab(selectedTab);
  }

  selectTab(selectedTab: TabComponent) {
    // deactivate all tabs
    const isEditable = selectedTab.isEditable;
    this.tabs.toArray().forEach(tab => { tab.active = false; tab.contextMenuItems = [] });
    this.dynamicTabs.forEach(tab => {
      tab.active = false;
      tab.contextMenuItems = [];
      tab.isEditable = false;
      if (selectedTab.reportId === tab.reportId && selectedTab.layoutId === tab.layoutId && isEditable) {
        tab.isEditable = true;
      }
    });

    // activate the tab the user has clicked on.
    selectedTab.active = true;
    selectedTab.contextMenuItems = this.items;
    if (selectedTab.dataContext) {
      this.isChartChange.emit(selectedTab.dataContext.isChart);
      this.isTableChange.emit(selectedTab.dataContext.isTable);
    }
  }
  setDisplayCurrentState(selectedTab) {
    const isEditable = selectedTab.isEditable;
    this.dynamicTabs.forEach(tab => {
      if (selectedTab.reportId === tab.reportId && selectedTab.layoutId === tab.layoutId ) {
        tab.dataContext.isTable = selectedTab.layoutJson.isTable;
        tab.dataContext.isChart = selectedTab.layoutJson.isChart;
      }
    });
  }

  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i, 1);

        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);

        if (tab.active && this.dynamicTabs.length > 0) {
          let index = i;
          if (i >= this.dynamicTabs.length) {
            index = this.dynamicTabs.length - 1;
          }
          const selectedTab = this.dynamicTabs[index];
          // set tab index
          this.selectTab(selectedTab);
        }

        break;
      }
    }
  }

  setReportLayoutJson(layoutJson) {
    this.dynamicTabs.filter(tab => {
      if (tab.active) {
        tab.layoutJson = layoutJson
      }
    });
  }

  getActiveTab() {
    const activeTab = this.dynamicTabs.filter(tab => {
      return tab.active === true;
    })[0];
    return activeTab;
  }

  updateTabLayoutId(tab: TabComponent) {
    this.dynamicTabs.filter(element => {
      if (element.active) {
        element.layoutId = tab.layoutId;
      }
    })
  }

  closeActiveTab() {
    let activeTabs = this.dynamicTabs.filter((tab) => tab.active);
    if (activeTabs.length > 0) {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }

  rename($event, type) {
    switch (type) {
      case 'rename':
        const text = this.cacheContextClickTarget.html();
        const tabIndex = this.getTabIndexByName(text);
        this.tabs[tabIndex].data.isEditable = true;
        break;
    }

  }

  getTabIndexByName(name: string) {
    let res = null;
    this.dynamicTabs.forEach((tab, index) => {
      if (tab && tab.title === name) {
        res = index;
      }
    });
    return res;
  }

  onLeft() {
    this.isClickRight = true;
    this.viewLength = this._tabListContainer.nativeElement.children[0].offsetLeft;
    console.log('f' + this._tabListContainer.nativeElement.children[0].offsetLeft);
    // console.log('s' + $('.list').position().left);
    this._changeDetectorRef.markForCheck();
    this.isClickLeft = false;
    if (this.viewLength < 0) {
      this.scrollerLeft().then(res => {
        this.isClickLeft = true;
      });
    }
  }



  scrollerLeft() {
    const promise = new Promise((resolve, reject) => {
      this._changeDetectorRef.markForCheck();
      if (this.viewLength < 0) {
        // alert();
        $('.list').animate({ left: '-=' + this.getLeftPosi() + 'px' }, 'slow', () => {
          this._changeDetectorRef.markForCheck();
          resolve(true);
        });
      }
    });
    return promise;
  }

  getLeftPosi() {
    const length = this._tabListContainer.nativeElement.offsetWidth;
    if (this.viewLength > 0) {
      this._changeDetectorRef.markForCheck();
      // $('.scroller-left').hide();
      return false;
    } else {
      if (this.viewLength > -(length) / 3) {
        this._changeDetectorRef.markForCheck();
        return this.viewLength;
      } else {
        this._changeDetectorRef.markForCheck();
        return -(length) / 3;

      }

    }

  };

  onRight() {

    this.viewLength = this._tabListContainer.nativeElement.children[0].offsetLeft;
    console.log('f' + this._tabListContainer.nativeElement.children[0].offsetLeft);
    // console.log('s' + $('.list').position().left);
    this._changeDetectorRef.markForCheck();
    this.isClickRight = false;
    // if (this.viewLength >= 0) {
    this.setRightPos().then(res => {
      this.isClickRight = true;
    });
    // }

  }

  setRightPos() {
    const promise = new Promise((resolve, reject) => {
      this._changeDetectorRef.markForCheck();
      // if (this.viewLength >= 0) {
      // alert();
      $('.list').animate({ left: '-=' + this.getRightPosi() + 'px' }, 'slow', () => {
        this._changeDetectorRef.markForCheck();
        resolve(true);
      });
      // }
    });
    return promise;
  }


  getRightPosi() {
    this.isClickLeft = true;
    const length = this._tabListContainer.nativeElement.offsetWidth;
    // const outerWidth = $('.wrapper').outerWidth();
    const itemWidth = this.widthOfList();
    console.log(length - this.itemsWidth - this._tabListContainer.nativeElement.children[0].offsetLeft);
    // -widthOfList()-getLeftPosi()

    if (this.itemsWidth + this._tabListContainer.nativeElement.children[0].offsetLeft >= length) {
      if (this.itemsWidth + this._tabListContainer.nativeElement.children[0].offsetLeft > (length) / 4) {
        return (length) / 3;

      } else {
        return this.itemsWidth + this._tabListContainer.nativeElement.children[0].offsetLeft
      }
    } else {
      return false;
    }
  };

  widthOfList() {
    this.itemsWidth = 0;
    //  let itemsWidth = 0;
    console.log(this._tabListContainer.nativeElement.children[0].querySelectorAll('li'));
    const allLiElement = this._tabListContainer.nativeElement.children[0].querySelectorAll('li');
    allLiElement.forEach(res => {
      this.itemWidth = res.offsetWidth;
      this.itemsWidth += this.itemWidth;
    })
    // $('.list .scrollable-content').each(() => {

    // });
    return this.itemsWidth
  };

}
