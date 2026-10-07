import { environment } from '../../environments/environment';
import { Component,  OnInit, Renderer2 } from '@angular/core';
import 'src/assets/js/m.js';
declare var im:any ;

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.css']
})

export class MenuClientComponent implements OnInit {
  elementRef: any;
  private _document: any;
  
  

  constructor(private renderer2: Renderer2  )  { }
  salades:any;
 


  async ngOnInit(): Promise<void> {
    
    const rep = await fetch(${environment.apiUrl}/salade");
    if (rep.ok){
    
      rep.json().then(data =>{//raj3etlna objet json data
        this.salades = data;
        console.log(this.salades)
          });
      }
      
      
    }
   imo(){
    new im();
   }
      
  
}
  
  

  
  
      



