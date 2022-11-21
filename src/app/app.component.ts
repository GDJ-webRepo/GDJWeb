import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GDJ-web';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // logout() {
  //   this.authService.SignOut()
  // }
}