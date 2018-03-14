import { NgModule, EventEmitter, Directive, ViewContainerRef, Input, Output, ContentChildren, ContentChild, TemplateRef, OnInit, OnChanges, OnDestroy, AfterContentInit, QueryList, SimpleChanges, EmbeddedViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// @Component({
//     selector: 'p-header',
//     template: '<ng-content></ng-content>'
// })
// export class Header {}

// @Component({
//     selector: 'p-footer',
//     template: '<ng-content></ng-content>'
// })
// export class Footer { }

@Directive({
    selector: '[pTemplate]',
    host: {
    }
})
export class PrimeTemplate {

    @Input() type: string;

    @Input('pTemplate') name: string;

    constructor(public template: TemplateRef<any>) { }

    getType(): string {
        return this.name;
    }
}

@Directive({
    selector: '[pTemplateWrapper]'
})
export class TemplateWrapper implements OnInit, OnDestroy {

    @Input() index: number;

    @Input('pTemplateWrapper') templateRef: TemplateRef<any>;

    view: EmbeddedViewRef<any>;

    _item: any;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.render();
    }

    set item(item: any) {
        this._item = item;

        if (this.view) {
            this.view.destroy();
            this.render();
        }
    }

    @Input() get item(): any {
        return this._item;
    }

    render() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}



// @Component({
//     selector: 'p-row',
//     template: ``
// })
// export class Row {

//     @ContentChildren(Column) columns: QueryList<Column>;

// }

// @Component({
//     selector: 'p-headerColumnGroup',
//     template: ``
// })
// export class HeaderColumnGroup {

//     @Input() frozen: boolean;

//     @ContentChildren(Row) rows: QueryList<any>;
// }

// @Component({
//     selector: 'p-footerColumnGroup',
//     template: ``
// })
// export class FooterColumnGroup {

//     @Input() frozen: boolean;

//     @ContentChildren(Row) rows: QueryList<any>;
// }

@Component({
    selector: 'p-columnBodyTemplateLoader',
    template: ``
})
export class ColumnBodyTemplateLoader implements OnInit, OnChanges, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    @Input() rowIndex: number;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.view) {
            return;
        }

        if ('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'p-columnHeaderTemplateLoader',
    template: ``
})
export class ColumnHeaderTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'p-columnFooterTemplateLoader',
    template: ``
})
export class ColumnFooterTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'p-columnFilterTemplateLoader',
    template: ``
})
export class ColumnFilterTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'p-columnEditorTemplateLoader',
    template: ``
})
export class ColumnEditorTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    @Input() rowIndex: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'p-templateLoader',
    template: ``
})
export class TemplateLoader implements OnInit, OnDestroy {

    @Input() template: TemplateRef<any>;

    _data: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.render();
    }

    render() {
        if (this.view) {
            this.view.destroy();
        }

        if (this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    }

    @Input() get data(): any {
        return this._data;
    }

    set data(val: any) {
        this._data = val;
        this.render();
    }

    ngOnDestroy() {
        if (this.view) {
            this.view.destroy();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ TemplateWrapper, ColumnHeaderTemplateLoader,
        ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader,
        PrimeTemplate, TemplateLoader, ColumnEditorTemplateLoader],
    declarations: [ TemplateWrapper, ColumnHeaderTemplateLoader,
        ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader,
        PrimeTemplate, TemplateLoader, ColumnEditorTemplateLoader]
})
export class SharedModule { }
