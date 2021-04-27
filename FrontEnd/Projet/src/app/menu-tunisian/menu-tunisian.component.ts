import { Component, OnInit } from '@angular/core';
import 'src/assets/js/m.js';
declare var im:any ;
@Component({
  selector: 'app-menu-tunisian',
  templateUrl: './menu-tunisian.component.html',
  styleUrls: ['./menu-tunisian.component.css']
})
export class MenuTunisianComponent implements OnInit {
  salades: any;
  tunisians: any;

  constructor() { }

  async ngOnInit(): Promise<void> {
    const rep = await fetch("http://127.0.0.1:8000/tunisian");
    if (rep.ok){
    
      rep.json().then(data =>{//raj3etlna objet json data
        this.tunisians = data;
        console.log(this.tunisians)
          });
      }
      
      
  }
  imo(){
    new im();
   }
}
