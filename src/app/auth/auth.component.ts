import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginMode: boolean = true;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';

  onSubmit = (form: NgForm) => {
    this.isLoading = true;
    let authObservable = new Observable<AuthResponse>();
    if (!this.loginMode) {
      authObservable = this.authService.signUp(
        form.value.email,
        form.value.password
      );
    } else {
      authObservable = this.authService.signIn(
        form.value.email,
        form.value.password
      );
    }

    authObservable.subscribe(
      (response) => {
        //console.log(response);
        this.isLoading = false;
        if (response.registered) {
          this.successMessage = 'login successful!';
        }
        this.router.navigate(['/recipes']);
      },
      (errorRes) => {
        //console.log(errorRes);

        switch (errorRes.error.error.message) {
          case 'INVALID_EMAIL':
            this.errorMessage = 'Invalid email, please enter a correct one!';
            break;
          case 'EMAIL_EXISTS':
            this.errorMessage =
              'This email is already in use, please use a different one.';
            break;
          default:
            this.errorMessage = 'An error occurred. Please try again later.';
            break;
        }

        this.isLoading = false;
      }
    );

    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);

    form.reset();
  };

  onSwitchMode = () => {
    this.loginMode = !this.loginMode;
  };
}
