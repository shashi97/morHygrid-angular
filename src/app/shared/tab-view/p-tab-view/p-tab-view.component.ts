import {
    NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, HostListener, AfterContentInit,
    ContentChildren, ContentChild, ChangeDetectorRef, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef, ViewChild, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from './common/shared';
import { BlockableUI } from './common/blockableui';

let idx = 0;
// p-next-add-icon

@Component({
    selector: '[p-next-add-icon]',
    template: `<ng-template><li>debanjan</li></ng-template>`
})
export class TabNextIconComponent {


}
declare const $;
@Component({
    selector: '[p-tabViewNav]',
    host: {
        '[class.ui-tabview-nav]': 'true',
        '[class.ui-helper-reset]': 'true',
        '[class.ui-helper-clearfix]': 'true',
        '[class.ui-widget-header]': 'true',
        '[class.ui-corner-all]': 'true'
    },
    template: `
   
        <ng-template ngFor let-tab [ngForOf]="tabs">
            <li [class]="getDefaultHeaderClass(tab)"  [ngStyle]="tab.headerStyle" role="presentation"
                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}"
                (click)="clickTab($event,tab)" *ngIf="!tab.closed && !tab.showAddButton">
                <a [attr.id]="tab.id + '-label'" href="#" role="tab" [attr.aria-selected]="tab.selected" [attr.aria-controls]="tab.id">
                    <span class="ui-tabview-left-icon fa" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                    <span class="ui-tabview-title">{{tab.header}}</span>
                    <span class="ui-tabview-right-icon fa" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                </a>
                <span *ngIf="tab.closable" class="ui-tabview-close fa fa-close" (click)="clickClose($event,tab)"></span>
            </li>
          
        </ng-template>
          
    `,
})
export class TabViewNavComponent implements AfterViewInit {

    hidWidth: string;

    scrollBarWidths = 40;

    @Input() tabs: TabPanelComponent[];

    @Input() orientation = 'top';
    setwidth;
    isHoverOnAdd = false;

    @Output() onTabClick: EventEmitter<any> = new EventEmitter();

    @Output() onNewTabCreate: EventEmitter<any> = new EventEmitter();

    @Output() onTabCloseClick: EventEmitter<any> = new EventEmitter();
    @Output() widthOfListChange: EventEmitter<any> = new EventEmitter();
    @ViewChild('tabListContainer') _tabListContainer: ElementRef;
    getDefaultHeaderClass(tab: TabPanelComponent) {
        let styleClass = 'scrollable-content ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + '' + tab.headerStyleClass;
        }
        return styleClass;
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef) {

    }


    ngAfterViewInit() {
        // const hidWidth;
        // const scrollBarWidths = 40;
        // let setwidth;
        // const widthOfList = function () {
        //     let itemsWidth = 0;
        //     $('.list .scrollable-content').each(function () {
        //         const itemWidth = $(this).outerWidth();
        //         // this.setwidth = itemWidth;
        //         setwidth = itemWidth;
        //         itemsWidth += itemWidth;
        //         //  this.widthOfListChange.emit(itemsWidth);
        //     });

        //     return itemsWidth;

       // };



        // const widthOfHidden = function () {
        //     return -(setwidth);
        // };

        // const getLeftPosi = function () {
        //     if ($('.list').position().left > -1.640625) {
        //         // $('.scroller-left').hide();
        //         return false;
        //     } else {
        //         if ($('.list').position().left > -(setwidth)) {
        //             return $('.list').position().left;
        //         } else {
        //             return -(setwidth)

        //         }

        //     }

        // };

        // const reAdjust = function () {
        //     if (($('.wrapper').outerWidth()) < widthOfList()) {
        //         $('.scroller-right').show();
        //     } else {
        //         $('.scroller-right').hide();
        //     }

        //     if ($('.list').position().left > -1.640625) {
        //         $('.scroller-left').hide();
        //     } else {
        //         // $('.item').animate({ left: '-=' + getLeftPosi() + 'px' }, 'slow');

        //         $('.scroller-left').show();
        //     }
        // }

        // reAdjust();

        // $(window).on('resize', function (e) {
        //     reAdjust();
        // });



        // $('.scroller-left').click(function () {

        //     // $('.scroller-right').fadeIn('slow');
        //     // $('.scroller-left').fadeOut('slow');
        //     if ($('.list').position().left < -1.640625) {
        //         // alert();
        //         $('.list').animate({ left: '-=' + getLeftPosi() + 'px' }, 'slow', function () {

        //         });
        //     }
        // });
    }


    // $(window).on('resize', function(e) {
    //     reAdjust();
    // });


    public clickTab(event, tab: TabPanelComponent) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        })
    }

    public clickClose(event, tab: TabPanelComponent) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        })
    }


    // addNewWindow(event, tab: TabPanelComponent) {
    //     this.onNewTabCreate.emit({
    //         originalEvent: event,
    //         tab: tab
    //     })
    // }

}

@Component({
    selector: 'p-tabPanel',
    template: `
        <div [attr.id]="id" class="ui-tabview-panel ui-widget-content" [ngClass]="{'ui-helper-hidden': !selected}" 
            role="tabpanel" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id + '-label'" *ngIf="!closed">
            <ng-content></ng-content>
            <p-templateLoader [template]="contentTemplate" *ngIf="contentTemplate&&(cache ? loaded : selected)"></p-templateLoader>
        </div>
    `
})
export class TabPanelComponent implements AfterContentInit, OnDestroy {

    @Input() header: string;

    @Input() showAddButton = false;

    @Input() disabled: boolean;

    @Input() closable: boolean;

    @Input() headerStyle: any;

    @Input() headerStyleClass: string;

    @Input() leftIcon: string;

    @Input() rightIcon: string;

    @Input() cache = true;

    @Input() isEditable;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    closed: boolean;

    view: EmbeddedViewRef<any>;

    _selected: boolean;

    loaded: boolean;
    itemWidth: number;
    isHoverOnAdd = false;

    id = `ui-tabpanel-${idx++}`;

    contentTemplate: TemplateRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }


    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    @Input() get selected(): boolean {
        return this._selected;
    }

    set selected(val: boolean) {
        this._selected = val;
        this.loaded = true;
    }

    ngOnDestroy() {
        this.view = null;
    }
}

@Component({
    selector: 'p-tabView',
    template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" 
        [ngStyle]="style" [class]="styleClass">
       <div  class="ui-g">
        <div class="ui-g-12 ui-md-12 ui-lg-12" >
         <div class="scroller scroller-left" 
         (click)="isClickLeft===true?onLeft():''" ><i class="glyphicon glyphicon-chevron-left"></i></div>
  <div class="scroller scroller-right"  (click)="isClickRight===true?onRight():''"><i class="glyphicon glyphicon-chevron-right"></i></div>
        <div class="wrapper" #tabListContainer>
              <ul 
              class="list nav nav-tabs" p-tabViewNav role="tablist" *ngIf="orientation!='bottom'" [tabs]="tabs" [orientation]="orientation" 
                (onTabClick)="open($event.originalEvent, $event.tab)" (widthOfListChange)="onwidthOfListChange($event)"
                 (onNewTabCreate)="createNewTab($event.originalEvent, $event.tab)"
                  (onTabCloseClick)="close($event.originalEvent, $event.tab)">
                  </ul>
                  </div>
                  </div>
                   
                  </div>

            

            <div class="ui-tabview-panels" >
                <ng-content></ng-content>
            </div>
           
            <ul p-tabViewNav role="tablist" *ngIf="orientation=='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
                </div>
               
        
    `,
})
export class TabViewComponent implements AfterContentInit, BlockableUI, AfterViewInit {

    @Input() orientation = 'top';

    @Input() style: any;

    @Input() styleClass: string;

    @Input() controlClose: boolean;
    isClickLeft = true;
    isClickRight = true;
    isLeftEnd = false;
    viewLength;
    itemsWidth;
    itemWidth;
    @ContentChildren(TabPanelComponent) tabPanels: QueryList<TabPanelComponent>;
    @ViewChild(TabViewNavComponent) child: TabViewNavComponent;
    @ViewChild('tabListContainer') _tabListContainer: ElementRef;
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onCreate: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    tabs: TabPanelComponent[];

    _activeIndex: number;

    _lazy: boolean;

    constructor(public el: ElementRef, private _changeDetectorRef: ChangeDetectorRef) { }

    @Input() get lazy(): boolean {
        return this._lazy;
    }

    set lazy(val: boolean) {
        this._lazy = val;
        console.log('Lazy property of TabView is deprecated, use an ngTemplate inside a TabPanel instead for Lazy Loading');
    }

    ngAfterContentInit() {
        this.initTabs();
        // this.widthOfList();
        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });
    }

    ngAfterViewInit() {
        this.itemsWidth = function () {
            let itemsWidth = 0;
            $('.list .scrollable-content').each(function () {
                const itemWidth = $(this).outerWidth();
                this.setwidth = itemWidth;
                itemsWidth += itemWidth;
            });
            return itemsWidth;
        };
    }

    onwidthOfListChange(event) {
        alert(event);
    }

    onLeft() {
          this.isClickRight = true;
        this.viewLength = this._tabListContainer.nativeElement.children[0].offsetLeft;
        console.log('f' + this._tabListContainer.nativeElement.children[0].offsetLeft);
        console.log('s' + $('.list').position().left);
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
        console.log('s' + $('.list').position().left);
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
            if (this.itemsWidth + this._tabListContainer.nativeElement.children[0].offsetLeft  > (length) / 4)  {
               return (length) / 3;
              
            } else {
                    return this.itemsWidth + this._tabListContainer.nativeElement.children[0].offsetLeft
            }
        } else {
            return false;
        }
        // const scrollDistance = this._getMaxScrollDistance();
        // const _disableScrollAfter = ((this._tabListContainer.nativeElement.scrollWidth) === scrollDistance
        //     || (this._tabListContainer.nativeElement.scrollWidth) === scrollDistance - 1) ? true : false;
        // // if (_disableScrollAfter) {
        // this._changeDetectorRef.markForCheck();
        // $('.scroller-left').hide();
        //      return false;
        //    } else {
        // if (this.viewLength > (length) / 3) {
        //     this._changeDetectorRef.markForCheck();
        //     return this.viewLength;
        // } else {
        //  this._changeDetectorRef.markForCheck();
        // return (length) / 3;

        // }

        //   }

    };

    // _getMaxScrollDistance(): number {
    //     const lengthOfTabList = this._tabListContainer.nativeElement.children[0].scrollWidth;
    //     const viewLength = this._tabListContainer.nativeElement.offsetWidth;

    //     return lengthOfTabList - viewLength || 0;
    // }


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

    initTabs(): void {
        this.tabs = this.tabPanels.toArray();
        const selectedTab: TabPanelComponent = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex) {
                this.tabs[this.activeIndex].selected = true;
            } else {
                this.tabs[0].selected = true;
            }
        }
    }
    getStyle(isHoverOnAdd) {
        let style;
        style = {
            'color': isHoverOnAdd ? 'white' : 'black'
        }

        return style;
    }

    open(event: Event, tab: TabPanelComponent) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }

        if (!tab.selected) {
            const selectedTab: TabPanelComponent = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false
            }
            tab.selected = true;
            this.onChange.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        }

        if (event) {
            event.preventDefault();
        }
    }

    createNewTab(event: Event, tab: TabPanelComponent) {
        // const widthOfList = function () {
        //     let itemsWidth = 0;
        //     $('.list .scrollable-content').each(function () {
        //         const itemWidth = $(this).outerWidth();
        //         itemsWidth += itemWidth;
        //     });
        //     return itemsWidth;

        // };
        // const widthOfHidden = function () {
        //     return (($('.wrapper').outerWidth()) - widthOfList() - $('.list').position().left) - 40;
        // };
        // $('.list').animate({ left: '+=' + widthOfHidden() + 'px' }, 'slow', function () {

        // });
        this.onCreate.emit({
            originalEvent: event,
            index: this.findTabIndex(tab)
        });
    }

    close(event: Event, tab: TabPanelComponent) {
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }
            }
            );
        } else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }

        event.stopPropagation();
    }

    closeTab(tab: TabPanelComponent) {
        if (tab.selected) {
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                const tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }

        tab.closed = true;
    }

    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }

    findTabIndex(tab: TabPanelComponent) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] === tab) {
                index = i;
                break;
            }
        }
        return index;
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    @Input() get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(val: number) {
        this._activeIndex = val;

        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
        }
    }
}


@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [TabViewComponent, TabPanelComponent, TabViewNavComponent, SharedModule, TabNextIconComponent],
    declarations: [TabViewComponent, TabPanelComponent, TabViewNavComponent, TabNextIconComponent]
})
export class TabViewModule { }