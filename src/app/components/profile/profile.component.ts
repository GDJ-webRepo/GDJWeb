import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';




@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }


  // saveProfile() {
  //   const { uid, ...data } = this.profileForm.value;

  //   if (!uid) {
  //     return;
  //   }

  //   this.usersService
  //     .updateUser({
  //       uid, ...data,
  //       roles: {subscriber: true}
  //     })
  //     .pipe(
  //       this.toast.observe({
  //         loading: 'Saving profile data...',
  //         success: 'Profile updated successfully',
  //         error: 'There was an error in updating the profile',
  //       })
  //     )
  //     .subscribe();
  // }
}