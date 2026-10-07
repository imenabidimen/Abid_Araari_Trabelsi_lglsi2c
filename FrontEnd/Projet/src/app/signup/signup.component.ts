import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare function signo(): any;
@Component({ selector:'app-signup', templateUrl:'./signup.component.html', styleUrls:['./signup.component.css'] })
export class SignupComponent implements OnInit {
  constructor() {}
  ngOnInit(): void { signo(); }
  async signClick(): Promise<void> {
    const pw=(document.getElementById('pw') as HTMLInputElement).value;
    const pwd1=(document.getElementById('pwd1') as HTMLInputElement).value;
    const nom=(document.getElementById('nom') as HTMLInputElement).value.trim();
    const email=(document.getElementById('email') as HTMLInputElement).value.trim();
    if(pwd1!==pw){ alert('Please check the password confirmation.'); return; }
    if(!nom || !email || pwd1.length<8){ alert('Please provide a name, email and a password of at least 8 characters.'); return; }
    try {
      const response=await fetch(environment.apiUrl+'/forum',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nom,email,pwd1})});
      if(!response.ok){ const error=await response.json().catch(()=>({})); alert(error.detail||'Could not create the account.'); return; }
      const account=await response.json();
      localStorage.setItem('nom',account.nom); localStorage.setItem('email',account.email||'');
      alert('Account created.'); window.location.href='/login';
    } catch { alert('Unable to reach the API. Make sure the backend is running.'); }
  }
}
