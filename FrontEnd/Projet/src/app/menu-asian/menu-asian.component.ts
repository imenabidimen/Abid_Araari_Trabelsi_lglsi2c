import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import 'src/assets/js/m.js';
declare var im:any ;
@Component({
  selector: 'app-menu-asian',
  templateUrl: './menu-asian.component.html',
  styleUrls: ['./menu-asian.component.css']
})
export class MenuAsianComponent implements OnInit {
  salades: any;
  asians: any;

  constructor() { }

  async ngOnInit(): Promise<void> {
    const rep = await fetch(${environment.apiUrl}/asian");
    if (rep.ok){
    
      rep.json().then(data =>{//raj3etlna objet json data
        this.asians = data;
        console.log(this.asians)
          });
      }
      
      
  }
  imo(){
    new im();
   }

}
