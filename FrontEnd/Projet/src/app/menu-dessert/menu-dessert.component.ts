import { Component, OnInit } from '@angular/core';
import 'src/assets/js/m.js';
declare var im:any ;
@Component({
  selector: 'app-menu-dessert',
  templateUrl: './menu-dessert.component.html',
  styleUrls: ['./menu-dessert.component.css']
})
export class MenuDessertComponent implements OnInit {
  salades: any;
  desserts: any;

  constructor() { }

  async ngOnInit(): Promise<void> {
    const rep = await fetch("http://127.0.0.1:8000/dessert");
    if (rep.ok){
    
      rep.json().then(data =>{//raj3etlna objet json data
        this.desserts = data;
        console.log(this.desserts)
          });
      }
      
      
  }
  imo(){
    new im();
   }

}
