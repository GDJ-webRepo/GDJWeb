import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';




@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // user$ = this.usersService.currentUserProfile$;

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  });

  constructor(

    private toast: HotToastService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
  
  }


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