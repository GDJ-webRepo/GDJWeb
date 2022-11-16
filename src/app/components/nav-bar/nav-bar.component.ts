import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  title = 'GDJ-web';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.SignOut
  }
}
