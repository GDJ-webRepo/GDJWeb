import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/user/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}
}