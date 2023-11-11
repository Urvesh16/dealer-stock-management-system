import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, ɵɵinject } from '@angular/core';

 
export const authGuard: CanActivateFn = (route, state) => {
  
    const router: Router = inject(Router);  
  const authService =  ɵɵinject(AuthService);
  
  if (authService.isAuthenticatedUser()) {
    return true; 
  } else {
    router.navigate(['/login']);
    return false;
  }
};