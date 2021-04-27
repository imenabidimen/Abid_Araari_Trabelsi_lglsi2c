import { Component, OnInit } from '@angular/core';
import 'src/assets/js/m.js';
declare var im:any ;
@Component({
  selector: 'app-menu-italian',
  templateUrl: './menu-italian.component.html',
  styleUrls: ['./menu-italian.component.css']
})
export class MenuItalianComponent implements OnInit {
  salades: any;
  italians: any;

  constructor() { }
  
  async ngOnInit(): Promise<void> {
   
    const rep = await fetch("http://127.0.0.1:8000/italian");
    if (rep.ok){
    
      rep.json().then(data =>{//raj3etlna objet json data
        this.italians = data;
        console.log(this.italians)
          });
      }
      
      
  }
  imo(){
    new im();
   
   }
}
