import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'hy-navbar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() moduleName: string;
  @Input() totalDB: number;
  @Input() faIcon: string;
  constructor(
  ) { }

  ngOnInit() {
  }

}
