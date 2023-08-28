import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, Subscription, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private authService: AuthService) {}

  authObservable: Subscription | undefined;
  isAuthenticated = false;

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    // return this.authService.user.pipe(
    //   take(1),
    //   map((user) => {
    //     const isAuth = !!user;
    //     if (isAuth) {
    //       return true;
    //     }
    //     return this.router.createUrlTree(['/auth']);
    //   })
    // );

    const userDataString = localStorage.getItem('userData');
    if (userDataString != null) {
      const userData = JSON.parse(userDataString);
     // console.log(userData);

      if (userData.id && userData.id.length > 0) {
        this.isAuthenticated = true;
      }
    }

    this.authService.user.subscribe(
      (user) => {
     //   console.log(user);
        if (user.id != undefined && user.id.length > 0) {
          this.isAuthenticated = true;
        }
      },
      (err) => console.log(err)
    );

    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
