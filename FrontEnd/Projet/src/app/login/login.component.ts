import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  async LoginClick(): Promise<void> {
    const user = (document.getElementById('nom') as HTMLInputElement).value.trim();
    const password = (document.getElementById('pwd1') as HTMLInputElement).value;

    if (user.toLowerCase() === 'admin') {
      const token = window.prompt('Enter the Foody admin token configured on the API');
      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${environment.apiUrl}/admin/verify`, {
          method: 'POST',
          headers: { 'X-Admin-Token': token }
        });

        if (!response.ok) {
          window.alert('Admin access was not accepted. Check the token and API configuration.');
          return;
        }

        sessionStorage.setItem('foodyAdminToken', token);
        window.location.href = '/admin';
      } catch {
        window.alert('Could not reach the Foody API.');
      }
      return;
    }

    try {
      const response = await fetch(`${environment.apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pwd: password })
      });

      if (!response.ok) {
        window.alert('Login failed. Please try again.');
        return;
      }

      const accounts = await response.json();
      if (!Array.isArray(accounts) || accounts.length === 0) {
        window.alert('No account found');
        return;
      }

      localStorage.setItem('nom', accounts[0].nom);
      window.location.href = '/menu1';
      window.alert('Welcome to Foody');
    } catch {
      window.alert('Could not reach the Foody API.');
    }
  }
}
