import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;
  authObservable: Subscription | undefined;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString != null) {
      const userData = JSON.parse(userDataString);
      if (userData.id && userData.id.length > 0) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }

    this.authObservable = this.authService.user.subscribe(
      (user) => {
        if (user.id != undefined) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      (err) => console.log(err)
    );
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.authObservable?.unsubscribe();
  }
}
