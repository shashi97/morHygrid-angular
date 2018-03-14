import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'hy-tableheader',
  templateUrl: './tableHeader.component.html',
  styleUrls: ['./tableHeader.component.css']
})
export class TableHeaderComponent implements OnInit, AfterViewInit {
  gb: String
  @Input() tableHeader: string;
  @Input() addFunctionName: string;
  @Output() addnewSource = new EventEmitter();
  @ViewChild('gb') _gb: ElementRef;

  // @Input() totalDB: number;
  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  addNew(): void {
    this.addnewSource.emit();
  }



}
