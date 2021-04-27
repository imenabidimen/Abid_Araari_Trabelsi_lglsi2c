import { Component, OnInit } from '@angular/core';
import 'src/assets/js/m.js';
declare var im:any ;
@Component({
  selector: 'app-menu-french',
  templateUrl: './menu-french.component.html',
  styleUrls: ['./menu-french.component.css']
})
export class MenuFrenchComponent implements OnInit {
  salades: any;
  frenchs: any;

  constructor() { }

  async ngOnInit(): Promise<void> {
    const rep = await fetch("http://127.0.0.1:8000/french");
    if (rep.ok){
    
      rep.json().then(data =>{//raj3etlna objet json data
        this.frenchs = data;
        console.log(this.frenchs)
          });
      }
      
      
  }
  imo(){
    new im();
   }


}
