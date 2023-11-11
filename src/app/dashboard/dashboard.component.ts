import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300) // Adjust the duration as needed
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0 })) // Adjust the duration as needed
      ])
    ])
  ]
})
export class DashboardComponent {

  isAdmin: boolean = false;
  isDealer: boolean = false;
  isAuthenticated: boolean=false;

  constructor(private authService: AuthService,private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticatedUser();
  }

  ngOnInit() {
    const userRole = this.authService.getUserRoles();
    if (userRole.role === 'admin') {
      this.isAdmin = true;
    } else if (userRole.role === 'dealer') {
      this.isDealer = true;
    }
    this.loadModulesBasedOnRole();
  }

  loadModulesBasedOnRole() {
    if (this.isAdmin) {
      this.router.navigate(['/dashboard/dealer']);
    } else if (this.isDealer) {
      this.router.navigate(['/dashboard/part-management']);
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

 

  
}
