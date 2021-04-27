import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
declare function h():any ;
@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit= function fCreateJSON(this: Menu1Component) {
      var element = <HTMLInputElement> document.getElementById("chef");
     var isChecked = element.checked;
      if (isChecked){
        this.router.navigateByUrl('/mClient');
        window.location.href="/mClient";
      }
      else{
        this.router.navigateByUrl('/mChef');
        window.location.href="/mChef";
        

       }
       
      }
      ng(): void {
        h();
      }
      
      
}
