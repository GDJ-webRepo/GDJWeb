import { MediaChange } from '@angular/flex-layout';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';

import { async, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/user/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userID = '';

  currentUserData?: Observable<User | undefined>;
  userData?: User | null;
  user$ = this.usersService.currentUserProfile$;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private route: ActivatedRoute,
    private us: UsersService,
    private usersService: UsersService,
    private router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user
      })
    }
  }

  editUserDialog(): void {
    console.log("user")
    console.log(this.userData)
    this.dialog.open(EditProfileComponent, {
      width: '40rem',
      data: {
        userData: this.userData,
      },
    });
  }

  deconnexion = () => this.authService.logout().subscribe(() => {
    this.router.navigate(['/']);
  });;
}
