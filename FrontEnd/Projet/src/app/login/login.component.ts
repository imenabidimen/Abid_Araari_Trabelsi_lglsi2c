import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare function signo(): any;
@Component({ selector:'app-login', templateUrl:'./login.component.html', styleUrls:['./login.component.css'] })
export class LoginComponent implements OnInit {
  constructor() {}
  ngOnInit(): void { signo(); }
  async LoginClick(): Promise<void> {
    const user=(document.getElementById('nom') as HTMLInputElement).value.trim();
    const pwd=(document.getElementById('pwd1') as HTMLInputElement).value;
    if(!user || !pwd){ alert('Please enter your username and password.'); return; }
    if(user==='admin' && pwd==='admin'){ window.location.href='/admin'; return; }
    try {
      const response=await fetch(environment.apiUrl+'/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user,pwd})});
      if(!response.ok){ const error=await response.json().catch(()=>({})); alert(error.detail||'Invalid username or password.'); return; }
      const account=await response.json();
      localStorage.setItem('nom',account.nom); localStorage.setItem('email',account.email||'');
      window.location.href='/menu1';
    } catch { alert('Unable to reach the API. Make sure the backend is running.'); }
  }
}
