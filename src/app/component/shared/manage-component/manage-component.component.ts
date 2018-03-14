import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ButtonModel } from './shared/manage-component.model';
@Component({
  selector: 'app-manage-component',
  templateUrl: './manage-component.component.html',
  styleUrls: ['./manage-component.component.css']
})

export class ManageComponent implements OnInit, OnChanges {

  @Input() header: string;
  @Input() iconClass: string;
  @Input() type: string;
  @Input() buttons: Array<ButtonModel> = [];

  defaultButton: Array<ButtonModel> = [{title: 'Cancel', name:'Cancel',  class: 'active bg-color-red custom-color-white' },

  {
    title: 'Save',
    name: 'Save',
    class: 'active bg-color-blue custom-color-white'
  }];
  @Output() saveChange: EventEmitter<any> = new EventEmitter();
  @Output() cancelChange: EventEmitter<any> = new EventEmitter();
  @Output() saveAndClose: EventEmitter<any> = new EventEmitter();
  constructor() { }



  ngOnInit() {
    if (this.buttons.length > 0) {
      this.buttons.map(res => {
        this.defaultButton.splice(this.defaultButton.length, -1, res);
      })
    }
  }
  ngOnChanges() {

  }
  onClickButton(buttonType): void {

    switch (buttonType.name) {
      case 'Save':
        this.saveChange.emit();
        break;
      case 'Cancel':
        this.cancelChange.emit();
        break;
      case 'saveAndClose':
        this.saveAndClose.emit();
        break;
      default:
        break;
    }
  }

}
