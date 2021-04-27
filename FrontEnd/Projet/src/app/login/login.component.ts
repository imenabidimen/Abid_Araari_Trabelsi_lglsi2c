import { Component, OnInit } from '@angular/core';


declare function signo():any ;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit():void {
    signo();
  }
  async LoginClick(){
    var user = (<HTMLInputElement>document.getElementById("nom")).value;
    var pwd =(<HTMLInputElement>document.getElementById("pwd1")).value;
    if ((user=="admin") &&( pwd=="admin")){
     
      window.open("/admin");
      
    }else{
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: 'POST',
      body:`{"user":"${user}","pwd":"${pwd}"}`});
      if(response.ok){
          response.json().then(function(data){
            if (JSON.stringify(data) !="[]"){
              let datas=  JSON.parse(JSON.stringify(data));
              localStorage.setItem("nom" , datas["0"].nom);
              localStorage.setItem("prenom" , datas["0"].prenom);
              window.location.href='/menu1';
              window.open("/menu1");
              alert(" welocome to foody world ")
              
            }
            else{
              alert(" No account found ")
            }
            
          });
        }
        
          

}

}
}





