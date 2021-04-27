import { Component, OnInit } from '@angular/core';
import 'src/assets/js/m.js';
declare var hey: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
 

}
createMemGauge() {
  new hey();  //drawGauge() is a function inside d3gauge.js
}
}
