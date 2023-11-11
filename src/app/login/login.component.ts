import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';
import * as authActions from 'src/app/actions/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from '../reducers/auth.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  error$: Observable<string | null>;
  loginForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private router: Router, private authService: AuthService,private store: Store<{ auth: AuthState }>, private fb: FormBuilder) {
    this.error$ = this.store.pipe(select('auth', 'error'));
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (user: any) => {
        if (user) {
          this.authService.getUserRole(this.loginForm.value.username).subscribe((userRole: any) => {
            if (userRole[0]?.role === 'admin' || userRole[0]?.role === 'dealer') {
              this.authService.setUserRole(userRole[0]);
              this.router.navigate(['/dashboard']);
            } else {
              this.errorMessage = 'Login failed. Please check your credentials.';
            }
          });
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      },
      (error) => {
        console.error('Error occurred during login:', error);
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    );
    
  }
}
}
