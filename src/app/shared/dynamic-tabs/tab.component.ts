/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngOutletContext directives.
 */

import { Component, Input, EventEmitter } from '@angular/core';
import { IShContextMenuItem } from 'ng2-right-click-menu';

@Component({
  selector: 'my-tab',
  styles: [`
    .pane{
      padding: 1em;
      padding-top:0px;
    }
  `],
  template: `
    <div [hidden]="!active" class="pane" style="height:calc(100vh - 160px)">
      <ng-content></ng-content>
      <ng-container *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ reportLayout: dataContext }"
      >
      </ng-container>
    </div>
  `
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  @Input() layoutId = 0;
  @Input() reportId = 0;
  @Input() isEditable = false;
  @Input() contextMenuItems: IShContextMenuItem[];
  @Input() renameFocus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() layoutJson = {};
}
