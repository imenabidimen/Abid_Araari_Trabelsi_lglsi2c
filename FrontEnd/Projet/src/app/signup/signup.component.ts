import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
declare function signo():any ;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    signo();
  }
  async signClick(){
    var pw = (<HTMLInputElement>document.getElementById("pw")).value;
    var pwd1 =(<HTMLInputElement>document.getElementById("pwd1")).value;
    if (pwd1!=pw){
      alert(" check password confirmation ")
    } else{
    var nom = (<HTMLInputElement>document.getElementById("nom")).value;
    var email =(<HTMLInputElement>document.getElementById("email")).value;
    
 
   
    const response = await fetch("${environment.apiUrl}/forum", {
      method: 'POST',
      body:`{"nom":"${nom}","email":"${email}","pwd1":"${pwd1}"}`});
    
      if(response.ok){
         
          response.json().then(function(data){
            if (JSON.stringify(data) !="[]"){
              let datas=  JSON.parse(JSON.stringify(data));
              localStorage.setItem("nom" , datas["0"].nom);
              localStorage.setItem("email" , datas["0"].email);
              window.location.reload();
              alert("done")
              
            }
            else{
              alert(" wrong ");
            }
            
          });
          
        
          

}
  }}}
