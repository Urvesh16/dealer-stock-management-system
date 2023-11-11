import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
'@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private baseUrl = 'http://localhost:3000';
  private userRole: any | null = null; // Add a userRole property to store the role

  constructor(private http: HttpClient) {}


  login(username: string, password: string) {
    const formattedDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
  });
  this.isAuthenticated = !!username && !!password;
    // Send a POST request to the JSON Server for user authentication
    return this.http.post(`${this.baseUrl}/logindetails`, { username, password, LoggedInDate: formattedDate  });
  }

  getUserRole(username: string) {
    // Fetch the user's role from the JSON Server
    return this.http.get(`${this.baseUrl}/users?username=${username}`);
  }

  setUserRole(role: string) {
    // Set the user's role
    this.userRole = role;
  }

  getUserRoles() {
    return this.userRole;
  }

  loggedIn() {
    return !!localStorage.getItem('login_token');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  

  logout(): void {
    this.isAuthenticated = false;
  }
  
}
