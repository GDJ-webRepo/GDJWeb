import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // user$ = this.usersService.currentUserProfile$;

  constructor(public authService: AuthService) {}
  ngOnInit(): void {}
}